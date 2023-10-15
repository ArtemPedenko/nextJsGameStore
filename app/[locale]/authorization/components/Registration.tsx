'use client';

import { FC } from 'react';
import SiteLogo from '@/images/SiteLogo';
import IconWrapper from '../../components/IconWrapper';
import styled from 'styled-components';
import { useI18n } from '@/locales/client';
import Button from '../../components/Button';
import { Formik } from 'formik';
import * as Yup from 'yup';

interface RegistrationProps {
	registerUser: Function;
	userError: boolean;
	setPageView: Function;
	setUserError: Function;
	registrError: string;
}

const Input = styled.input`
	width: 100%;
	height: 50px;
	background-color: #2a2a2a;
	border: 1px solid #686868;
	border-radius: 3px;
	color: white;
	padding: 0;
	&:focus {
		border: 1px solid white;
	}
`;

const Form = styled.form`
	display: flex;
	flex-direction: column;
	gap: 10px;
	width: 100%;
`;

const Registration: FC<RegistrationProps> = ({
	registerUser,
	userError,
	setPageView,
	setUserError,
	registrError,
}) => {
	const t = useI18n();

	return (
		<>
			<IconWrapper
				icon={<SiteLogo />}
				height='100px'
				width='100px'
				margin='0 10px'
			/>
			<Formik
				initialValues={{ email: '', password: '', login: '' }}
				onSubmit={(values) =>
					registerUser(values.email, values.password, values.login)
				}
				validateOnChange={false}
				validateOnBlur={false}
				validationSchema={Yup.object().shape({
					email: Yup.string().email().required('Обязательное поле'),
					login: Yup.string().min(6).required('Обязательное поле'),
					password: Yup.string().min(6).required('Обязательное поле'),
				})}
			>
				{(props) => {
					props.submitCount > 0 && (props.validateOnChange = true);
					const { values, errors, handleChange, handleSubmit } = props;
					return (
						<Form onSubmit={handleSubmit}>
							<Input
								id='email'
								placeholder={t(`enter_email`)}
								type='text'
								value={values.email}
								onChange={handleChange}
							/>
							{errors.email ? (
								<div style={{ color: 'red' }}>{errors.email}</div>
							) : null}
							<Input
								id='login'
								placeholder={t(`enter_nickname`)}
								type='text'
								value={values.login}
								onChange={handleChange}
							/>
							{errors.login ? (
								<div style={{ color: 'red' }}>{errors.login}</div>
							) : null}
							<Input
								id='password'
								placeholder={t(`enter_password`)}
								type='password'
								value={values.password}
								onChange={handleChange}
							/>
							{errors.password ? (
								<div style={{ color: 'red' }}>{errors.password}</div>
							) : null}

							<Button type='submit'>{t(`sign_up`)}</Button>
						</Form>
					);
				}}
			</Formik>
			{userError ? (
				<div style={{ color: 'red' }}>{t(`wrong_email_password`)}</div>
			) : null}
			{registrError ? <div style={{ color: 'red' }}>{registrError}</div> : null}
			{
				<>
					<div>{t(`have_account`)}</div>
					<div
						onClick={() => {
							setPageView('login');
							setUserError(false);
						}}
						style={{ textDecoration: 'underline', cursor: 'pointer' }}
					>
						{t(`sign_in`)}
					</div>
				</>
			}
		</>
	);
};

export default Registration;
