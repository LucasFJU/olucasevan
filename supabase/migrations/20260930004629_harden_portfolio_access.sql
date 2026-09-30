-- Keep the role helper out of the exposed public schema and check only the caller.
CREATE SCHEMA IF NOT EXISTS private;
REVOKE ALL ON SCHEMA private FROM PUBLIC;
GRANT USAGE ON SCHEMA private TO authenticated;

CREATE FUNCTION private.has_role(_role public.app_role)
RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles
    WHERE user_id = (SELECT auth.uid()) AND role = _role
  );
$$;
REVOKE ALL ON FUNCTION private.has_role(public.app_role) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION private.has_role(public.app_role) TO authenticated;

DROP POLICY IF EXISTS "Admins can read roles" ON public.user_roles;
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
CREATE POLICY "Users can view own roles" ON public.user_roles
  FOR SELECT TO authenticated USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Projects are viewable by everyone" ON public.projects;
DROP POLICY IF EXISTS "Anyone can view projects" ON public.projects;
CREATE POLICY "Published projects are public" ON public.projects
  FOR SELECT TO anon USING (status <> 'Rascunho');
CREATE POLICY "Admins can view all projects" ON public.projects
  FOR SELECT TO authenticated USING (status <> 'Rascunho' OR private.has_role('admin'));
DROP POLICY IF EXISTS "Admins can insert projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can update projects" ON public.projects;
DROP POLICY IF EXISTS "Admins can delete projects" ON public.projects;
CREATE POLICY "Admins can insert projects" ON public.projects
  FOR INSERT TO authenticated WITH CHECK (private.has_role('admin'));
CREATE POLICY "Admins can update projects" ON public.projects
  FOR UPDATE TO authenticated USING (private.has_role('admin')) WITH CHECK (private.has_role('admin'));
CREATE POLICY "Admins can delete projects" ON public.projects
  FOR DELETE TO authenticated USING (private.has_role('admin'));

DROP POLICY IF EXISTS "Authenticated users can read leads" ON public.leads;
DROP POLICY IF EXISTS "Admins can view leads" ON public.leads;
DROP POLICY IF EXISTS "Anyone can submit leads" ON public.leads;
CREATE POLICY "Admins can view leads" ON public.leads
  FOR SELECT TO authenticated USING (private.has_role('admin'));

DROP POLICY IF EXISTS "Admins can insert site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins can update site settings" ON public.site_settings;
DROP POLICY IF EXISTS "Admins can delete site settings" ON public.site_settings;
CREATE POLICY "Admins can insert site settings" ON public.site_settings
  FOR INSERT TO authenticated WITH CHECK (private.has_role('admin'));
CREATE POLICY "Admins can update site settings" ON public.site_settings
  FOR UPDATE TO authenticated USING (private.has_role('admin')) WITH CHECK (private.has_role('admin'));
CREATE POLICY "Admins can delete site settings" ON public.site_settings
  FOR DELETE TO authenticated USING (private.has_role('admin'));

DROP POLICY IF EXISTS "Authenticated users can upload project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can update project images" ON storage.objects;
DROP POLICY IF EXISTS "Authenticated users can delete project images" ON storage.objects;
DROP POLICY IF EXISTS "Auth users can upload project files" ON storage.objects;
DROP POLICY IF EXISTS "Auth users can update project files" ON storage.objects;
DROP POLICY IF EXISTS "Auth users can delete project files" ON storage.objects;
CREATE POLICY "Admins can upload project files" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'projects' AND private.has_role('admin'));
CREATE POLICY "Admins can update project files" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'projects' AND private.has_role('admin'))
  WITH CHECK (bucket_id = 'projects' AND private.has_role('admin'));
CREATE POLICY "Admins can delete project files" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'projects' AND private.has_role('admin'));

DROP FUNCTION public.has_role(uuid, public.app_role);
