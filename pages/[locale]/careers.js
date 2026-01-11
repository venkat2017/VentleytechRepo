import Head from 'next/head';
import Careers from '../../components/careers/careers';
import {useTranslation} from "next-i18next";
import brand from "../../public/text/brand";
import MainContainer from "../../components/MainContainer";
import React, {Fragment} from "react";
import PropTypes from "prop-types";
import {getStaticPaths, makeStaticProps} from 'lib/getStatic';
import {makeStyles} from 'tss-react/mui';

const useStyles = makeStyles({uniqId: 'error'})(theme => ({
    dedicatedPage: {
        background: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.background.paper,
    }
}));

export default function CareersPage(props) {

    const {classes} = useStyles();
    const {onToggleDark, onToggleDir} = props;
    const {errorCode, stars} = props;
    const {t} = useTranslation('common');

    return (
        <Fragment>
            <Head>
                <title>
                    {brand.ventleytech.name + ' - Careers' }
                </title>
            </Head>
            <div className={classes.dedicatedPage}>
                <MainContainer
                    onToggleDark={onToggleDark}
                    onToggleDir={onToggleDir}
                    invert
                >

                    <Careers/>
                </MainContainer>
            </div>
        </Fragment>

    );
}

CareersPage.propTypes = {
    errorCode: PropTypes.string,
    stars: PropTypes.number,
    onToggleDark: PropTypes.func.isRequired,
    onToggleDir: PropTypes.func.isRequired,
};

const getStaticProps = makeStaticProps(['common']);
export {getStaticPaths, getStaticProps};


