import React, {Fragment} from 'react';
import Head from 'next/head';
import ContactFrm from 'components/Forms/Contact';
import {useTranslation} from "next-i18next";
import brand from "../../public/text/brand";
import MainContainer from "../../components/MainContainer";
import {getStaticPaths, makeStaticProps} from 'lib/getStatic';
import {makeStyles} from 'tss-react/mui';


const useStyles = makeStyles({uniqId: 'error'})(theme => ({
    dedicatedPage: {
        background: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.background.paper,
    }
}));

function Contact(props) {

    const {classes} = useStyles();
    const {onToggleDark, onToggleDir} = props;
    const {errorCode, stars} = props;
    const {t} = useTranslation('common');

    return (
        <Fragment>
            <Head>
                <title>
                    {brand.ventleytech.name + ' - ' + errorCode}
                </title>
            </Head>
            <div className={classes.dedicatedPage}>
                <MainContainer
                    onToggleDark={onToggleDark}
                    onToggleDir={onToggleDir}
                    invert
                >
                    <br/>
                    <br/>
                    <br/>
                    <ContactFrm/>
                </MainContainer>
            </div>
        </Fragment>

    );

}

export default Contact;

// Use this below for Server Side Render/Translation (SSR)
// export const getStaticProps = async ({ locale }) => ({ props: { ...await serverSideTranslations(locale, ['common']) } });

// Use this below for Static Site Generation (SSG)
const getStaticProps = makeStaticProps(['common', 'ventleytech-landing']);
export {getStaticPaths, getStaticProps};
