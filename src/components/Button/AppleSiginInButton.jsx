import {
  SignInWithApple
} from '@capacitor-community/apple-sign-in';
import { Button } from "./Button";
import images from "assets/images";
import { useTranslation } from "react-i18next";
import { env } from "utils";

export const AppleSignInButton = ({ className, callback }) => {
  const { t } = useTranslation();

  let options = {
    clientId: env('REACT_APP_APPLE_CLIENT_ID','REACT_APP_APPLE_CLIENT_ID'),
    redirectURI: env('REACT_APP_APPLE_REDIRECT_URL','REACT_APP_APPLE_REDIRECT_URL'),
    scopes: 'email name',
    state: '',
    nonce: 'nonce',
  };
  

  const handleAppleSignIn = () => {
    SignInWithApple.authorize(options)
  .then((result) => {
    console.log(result);
  })
  .catch(error => {
    console.log(error);
  });
  }
  
  return (
    <Button
          label={t("social_apple", { keyPrefix: "auth" })}
          iconLeft={images.apple}
          iconClassName={"w-[20px] h-[20px] me-2"}
          className={
            className
          }
          onClick={handleAppleSignIn}
        />
  );
};
