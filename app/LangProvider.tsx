// @ts-nocheck

'use client';
import { ReactNode } from 'react';
import { I18nProviderClient } from '@/locales/client';

type ProviderProps = {
	locale: string;
	children: ReactNode;
};

export function LanguageProvider({ locale, children }: ProviderProps) {
	return (
		<I18nProviderClient locale={locale} fallback={<p>Loading...</p>}>
			{children}
		</I18nProviderClient>
	);
}
