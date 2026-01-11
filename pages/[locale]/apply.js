import Head from 'next/head';
import Apply from '../../components/careers/apply/apply';
import {makeStyles} from 'tss-react/mui';
import {useTranslation} from "next-i18next";
import React, {Fragment} from "react";
import brand from "../../public/text/brand";
import MainContainer from "../../components/MainContainer";
import PropTypes from "prop-types";
import {getStaticPaths, makeStaticProps} from 'lib/getStatic';

const useStyles = makeStyles({uniqId: 'error'})(theme => ({
    dedicatedPage: {
        background: theme.palette.mode === 'dark' ? theme.palette.background.default : theme.palette.background.paper,
    }
}));

export default function ApplyPage(props) {

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
                    <Apply/>
                </MainContainer>
            </div>
        </Fragment>

    );
}

ApplyPage.propTypes = {
    errorCode: PropTypes.string,
    stars: PropTypes.number,
    onToggleDark: PropTypes.func.isRequired,
    onToggleDir: PropTypes.func.isRequired,
};

const getStaticProps = makeStaticProps(['common']);
export {getStaticPaths, getStaticProps};
