import React, { useState } from 'react';
import clsx from 'clsx';
import Container from '@mui/material/Container';
import { useTranslation } from 'next-i18next';
import useStyle from './companyLogo-style';

// These match the exact filenames already committed under
// /public/images/clients in the repo. Next.js serves anything in /public
// from the site root, so public/images/clients/foo.png -> /images/clients/foo.png.
// Filenames with spaces are URI-encoded so the browser resolves them correctly.
const clientLogos = [
    { name: 'Capgemini', src: '/images/clients/Capgemini_Logo_Color_Print.jpg.jpeg' },
    { name: 'Barclays', src: '/images/clients/Barclays-Logo.jpg.jpeg' },
    { name: 'Aptino', src: '/images/clients/aptino.jpg.jpeg' },
    { name: 'TechMatrix Inc', src: '/images/clients/techmatrix_inc_cover.jpeg' },
    { name: 'Sira Consulting', src: encodeURI('/images/clients/Sira Consulting.JPG.jpeg') },
    { name: 'Saicon', src: '/images/clients/Saicon.jpg.jpeg' },
    { name: 'HCLTech', src: '/images/clients/HCL.jpg.jpeg' },
    { name: 'IBM', src: '/images/clients/IBM_logo_white_background.jpg.jpeg' },
    { name: 'KR Elixir Technology', src: '/images/clients/kr_elixir_inc_logo.jpeg' },
    { name: 'Millennium Software and Staffing', src: '/images/clients/MillenniumOnlyLogo.png' },
    { name: 'Covet IT Inc', src: encodeURI('/images/clients/Covet IT.png') },
    { name: 'Equifax', src: '/images/clients/Equifax_Main.jpg.jpeg' },
];

function LogoCard({ logo }) {
    const { classes } = useStyle();
    const [hovered, setHovered] = useState(false);

    return (
        <div
            className={classes.card}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <img
                src={logo.src}
                alt={logo.name}
                title={logo.name}
                loading="lazy"
                className={clsx(classes.logo, hovered && classes.logoHover)}
            />
        </div>
    );
}

function CompanyLogo() {
    const { classes } = useStyle();
    const { t } = useTranslation('common');

    return (
        <div className={classes.root}>
            <Container fixed>
                <div className={classes.headingWrap}>
                    <div className={classes.heading}>
                        {t('ventleytech-landing.clients_title', 'Trusted By Our Clients')}
                    </div>
                </div>
                <div className={classes.grid}>
                    {clientLogos.map((logo) => (
                        <LogoCard key={logo.name} logo={logo} />
                    ))}
                </div>
            </Container>
        </div>
    );
}

export default CompanyLogo;
