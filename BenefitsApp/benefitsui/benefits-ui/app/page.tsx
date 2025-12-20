'use client';

import '../src/App.scss';
import { useState } from 'react';
import { HomePage } from '../src/Home';
import { Benefits } from '../src/Benefits';
import { Employees } from '../src/Employees';
import { IconButton, Drawer, List, ListItem, ListItemButton, ListItemText, useMediaQuery, useTheme } from '@mui/material';
import { FiMenu } from 'react-icons/fi';

export default function Home() {
    const [activeTab, setActiveTab] = useState('home');
    const [mobileOpen, setMobileOpen] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };

    const handleTabChange = (tab: string) => {
        setActiveTab(tab);
        if (isMobile) {
            setMobileOpen(false);
        }
    };

    const renderContent = () => {
        switch(activeTab) {
            case 'home':
                return <HomePage />;
            case 'benefits':
                return <Benefits />;
            case 'employees':
                return <Employees />;
            default:
                return <HomePage />;
        }
    };

    const tabs = [
        { id: 'home', label: 'Home' },
        { id: 'benefits', label: 'Benefits' },
        { id: 'employees', label: 'Employees' }
    ];

    const drawer = (
        <div className="drawer-content">
            <List>
                {tabs.map((tab) => (
                    <ListItem key={tab.id} disablePadding>
                        <ListItemButton
                            onClick={(e) => {
                                e.stopPropagation();
                                handleTabChange(tab.id);
                            }}
                            selected={activeTab === tab.id}
                            sx={{
                                backgroundColor: activeTab === tab.id ? 'rgba(0, 123, 255, 0.1)' : 'transparent',
                                color: activeTab === tab.id ? '#007bff' : 'inherit',
                                fontWeight: activeTab === tab.id ? 'bold' : 'normal',
                                '&:hover': {
                                    backgroundColor: 'rgba(0, 123, 255, 0.05)'
                                }
                            }}
                        >
                            <ListItemText primary={tab.label} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    );

    return (
        <>
            <div className='App'>
                <div className='header-container'>
                    <header className='header'>
                        {/* Hamburger menu - Top right corner */}
                        {isMobile && (
                            <IconButton
                                color="inherit"
                                aria-label="open drawer"
                                onClick={handleDrawerToggle}
                                className="hamburger-menu"
                            >
                                <FiMenu size={24} />
                            </IconButton>
                        )}

                        {/* Title and subtitle - Top center/left */}
                        <div className="title-container">
                            <h1 className="header-title">
                                Paylocity Benefits
                            </h1>
                            <p className="header-subtitle">
                                Employee Benefits Management System
                            </p>
                        </div>

                        {/* Tabs - Bottom center (desktop only) - Following UX best practices */}
                        {!isMobile && (
                            <div className="tabs-container">
                                {tabs.map((tab) => (
                                    <button
                                        key={tab.id}
                                        onClick={() => handleTabChange(tab.id)}
                                        aria-label={`${tab.label} tab`}
                                        aria-selected={activeTab === tab.id}
                                        role="tab"
                                        className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
                                    >
                                        {tab.label}
                                    </button>
                                ))}
                            </div>
                        )}
                    </header>

                    <Drawer
                        variant="temporary"
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
                        }}
                    >
                        {drawer}
                    </Drawer>
                </div>

                <div className="content-container">
                    {renderContent()}
                </div>
            </div>
        </>
    );
}




/*import Image from "next/image";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
        <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={100}
          height={20}
          priority
        />
        <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
          <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
            To get started, edit the page.tsx file.
          </h1>
          <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
            Looking for a starting point or more instructions? Head over to{" "}
            <a
              href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Templates
            </a>{" "}
            or the{" "}
            <a
              href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
              className="font-medium text-zinc-950 dark:text-zinc-50"
            >
              Learning
            </a>{" "}
            center.
          </p>
        </div>
        <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-foreground px-5 text-background transition-colors hover:bg-[#383838] dark:hover:bg-[#ccc] md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              className="dark:invert"
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-black/[.08] px-5 transition-colors hover:border-transparent hover:bg-black/[.04] dark:border-white/[.145] dark:hover:bg-[#1a1a1a] md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div>
      </main>
    </div>
  );
}
*/