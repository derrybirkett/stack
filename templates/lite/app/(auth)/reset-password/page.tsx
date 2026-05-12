import { redirect } from 'next/navigation';
import Link from 'next/link';
import { createClient } from '@/lib/supabase/server';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';

export default async function ResetPasswordPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; sent?: string }>;
}) {
  const { error, sent } = await searchParams;

  async function resetPassword(formData: FormData) {
    'use server';
    const supabase = await createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(
      formData.get('email') as string,
      { redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/update-password` },
    );
    if (error) redirect(`/reset-password?error=${encodeURIComponent(error.message)}`);
    redirect('/reset-password?sent=1');
  }

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Reset password</CardTitle>
        <CardDescription>We&apos;ll send a link to your email.</CardDescription>
      </CardHeader>
      <form action={resetPassword}>
        <CardContent className="flex flex-col gap-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{decodeURIComponent(error)}</AlertDescription>
            </Alert>
          )}
          {sent && (
            <Alert>
              <AlertDescription>Check your email for a reset link.</AlertDescription>
            </Alert>
          )}
          <Input name="email" type="email" placeholder="you@example.com" required />
        </CardContent>
        <CardFooter className="flex flex-col gap-3">
          <Button type="submit" className="w-full">Send reset link</Button>
          <Link href="/login" className="text-sm text-muted-foreground underline underline-offset-4">
            Back to sign in
          </Link>
        </CardFooter>
      </form>
    </Card>
  );
}
