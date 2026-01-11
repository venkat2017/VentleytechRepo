import React, { Fragment } from 'react';
import Head from 'next/head';
// Use this below for Server Side Render/Translation (SSR)
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
// Use this below for Static Site Generation (SSG)
import { getStaticPaths, makeStaticProps } from 'lib/getStatic';
import brand from 'public/text/brand';
import LoginForm from 'components/Forms/Login';

function Login() {
  return (
    <Fragment>
      <Head>
        <title>
          { ' Ventley Tech- Login' }
        </title>
      </Head>
      <div>
        <LoginForm />
      </div>
    </Fragment>
  );
}

export default Login;
const getStaticProps = makeStaticProps(['common']);
export { getStaticPaths, getStaticProps };
