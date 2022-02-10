import { useEffect } from "react";
import { AppPropsWithLayout } from "next";
import { useRouter } from "next/router";
import { ClerkProvider, SignedIn, SignedOut } from "@clerk/nextjs";
import "@/styles/globals.css";

/**
 * List pages you want to be publicly accessible, or leave empty if every page
 * requires authentication. Use this naming strategy:
 *  "/"              for pages/index.js
 *  "/foo"           for pages/foo/index.js
 *  "/foo/bar"       for pages/foo/bar.js
 *  "/foo/[...bar]"  for pages/foo/[...bar].js
 */
const publicPages = [
  "/sign-in/[[...index]]",
  "/sign-up/[[...index]]",
  "/verify-magic-link",
  "/privacy-policy",
  "/social-login-callback",
];

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  const router = useRouter();
  const isPublicPage = publicPages.includes(router.pathname);

  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout ?? ((page) => page);
  const page = getLayout(<Component {...pageProps} />);

  return (
    <ClerkProvider>
      <SignedIn>{page}</SignedIn>
      <SignedOut>{isPublicPage ? page : <SignInRedirect />}</SignedOut>
    </ClerkProvider>
  );
};

const SignInRedirect = () => {
  const router = useRouter();
  useEffect(() => {
    router.push(`/sign-in?redirect_url=${router.asPath}`);
  }, [router, router.asPath]);
  return null;
};

export default MyApp;
