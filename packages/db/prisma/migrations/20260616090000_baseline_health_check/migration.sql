CREATE TABLE IF NOT EXISTS public.health_check (
  id int PRIMARY KEY,
  note text,
  created_at timestamptz DEFAULT now(),
  last_ping timestamptz
);

ALTER TABLE public.health_check ENABLE ROW LEVEL SECURITY;

GRANT USAGE ON SCHEMA public TO anon, authenticated;
GRANT SELECT ON TABLE public.health_check TO anon, authenticated;
GRANT UPDATE ON TABLE public.health_check TO anon;

DROP POLICY IF EXISTS "Allow public read health check" ON public.health_check;

CREATE POLICY "Allow public read health check"
ON public.health_check
FOR SELECT
TO anon
USING (true);

DROP POLICY IF EXISTS "Allow public update health check" ON public.health_check;

CREATE POLICY "Allow public update health check"
ON public.health_check
FOR UPDATE
TO anon
USING (id = 1)
WITH CHECK (id = 1);