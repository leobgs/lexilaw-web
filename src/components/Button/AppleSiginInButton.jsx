import AppleLogin from "react-apple-login";
import { Button } from "./Button";
import images from "assets/images";
import { useTranslation } from "react-i18next";
import { env } from "utils";

export const AppleSignInButton = ({ className, callback }) => {
  const { t } = useTranslation();

  return (
    
    <AppleLogin
      clientId={env("REACT_APP_APPLE_CLIENT_ID", "APPLE_CLIENT_ID")}
      redirectURI={env("REACT_APP_APPLE_REDIRECT_URL", "APPLE_REDIRECT_URL")}
      usePopup={false}
      callback={callback}
      scope="email name"
      responseMode="query"
      responseType="code"
      render={(renderProps) => (
        <Button
          label={t("social_apple", { keyPrefix: "auth" })}
          iconLeft={images.apple}
          iconClassName={"w-[20px] h-[20px] me-2"}
          className={
            className
          }
          onClick={renderProps.onClick}
        />
      )}
    />
  );
};
