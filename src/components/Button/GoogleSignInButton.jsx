import { Button } from "./Button";
import images from "assets/images";
import { useTranslation } from "react-i18next";
// import { Plugins } from '@capacitor/core';
// const { GoogleAuth } = Plugins;
import { GoogleAuth } from '@codetrix-studio/capacitor-google-auth';
import { env } from "utils";

export const GoogleSignInButton = ({ className, callback }) => {
    const { t } = useTranslation();

    GoogleAuth.initialize({
        clientId: env('REACT_APP_GOOGLE_OAUTH_CLIENT_ID_WEB', 'REACT_APP_GOOGLE_OAUTH_CLIENT_ID_WEB'),
        scopes: ['profile', 'email'],
        grantOfflineAccess: true,
    });


    const handleGoogleSignIn = () => {
        GoogleAuth.signIn()
            .then((response) => {
                console.log('Google sign-in successful:', response);
                console.log('credential:', response.authentication.idToken);

            })
            .catch((error) => {
                console.error('Google sign-in error:', error);
            });
    }


    return (
        <Button

            label={t('social_google', { keyPrefix: 'auth' })}
            iconLeft={images.google}
            iconClassName={'w-[20px] h-[20px] me-2'}

            // label={t("social_apple", { keyPrefix: "auth" })}
            // iconLeft={images.apple}
            // iconClassName={"w-[20px] h-[20px] me-2"}
            className={
                className
            }
            onClick={handleGoogleSignIn} />
    );
};
