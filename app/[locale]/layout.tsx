// @ts-nocheck
'use client';
import { ReactElement } from 'react';
import { I18nProviderClient } from '../../locales/client';
import Header from './modules/Header';
import HeaderSticky from './modules/HeaderSticky';
import Footer from './modules/Footer';
import { Providers } from '../store/provider';

export default function SubLayout({ children }: { children: ReactElement }) {
	return <Providers>{children}</Providers>;
}
