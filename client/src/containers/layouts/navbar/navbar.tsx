/* LAYOUT NAVBAR COMPONENT
   ========================================================================== */

import { useCallback, useMemo } from "react";

import { NavLink, useNavigate } from "react-router-dom";
import { Select } from "components";
import Styled from "./navbar.style";
import { useSessionStorage } from "hooks";
import { useTheme } from "services/styled-themes";
import { useTranslation } from "services/i18n";
import { removeLocalStorage } from "utils/functions";
import ROUTES from "routes/constant";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { theme, setTheme } = useTheme();
  const [refreshToken, setRefreshToken] = useSessionStorage<string | null>(
    "refresh-token",
    null,
  );
  const navigate = useNavigate();

  const activateLink = useCallback((isLastItem?: boolean) => {
    return ({ isActive }: { isActive: boolean }) => ({
      marginRight: isLastItem ? 0 : 20,
      color: isActive ? "green" : "",
    });
  }, []);

  const languageOptions = useMemo(() => {
    return [
      { label: "English", value: "en" },
      { label: "France", value: "fr" },
      { label: "Vi", value: "vi" },
    ];
  }, []);

  const handleChange = useCallback(
    async (e) => {
      try {
        await i18n.changeLanguage(e.target.value);
      } catch (error) {
        console.log(error);
      }
    },
    [i18n],
  );

  const handleThemeSwitch = useCallback(async () => {
    try {
      const newTheme = theme === "dark" ? "light" : "dark";
      setTheme(newTheme);
    } catch (error) {
      console.log(error);
    }
  }, [setTheme, theme]);

  const handleLogout = useCallback(async () => {
    removeLocalStorage("tokens");
    navigate(ROUTES.login);
  }, [navigate]);

  const renderThemeSwitcher = useMemo(() => {
    const icon = theme === "dark" ? <span>☀️</span> : <span>🌙</span>;

    return (
      <Styled.ThemeSwitcher onClick={handleThemeSwitch}>
        {icon}
      </Styled.ThemeSwitcher>
    );
  }, [handleThemeSwitch, theme]);

  const renderUserMenu = useMemo(() => {
    // if (!refreshToken) {
    //   return null;
    // }

    return (
      <Styled.SignOutButton type="button" onClick={handleLogout}>
        {t("navbar.sign_out")}
      </Styled.SignOutButton>
    );
  }, [handleLogout, t]);

  return (
    <Styled.Container>
      <div>
        <NavLink to={"/"} style={activateLink()}>
          {t("navbar.homepage")}
        </NavLink>
        <NavLink to={"/posts"} style={activateLink()}>
          {t("navbar.posts")}
        </NavLink>
        <NavLink to={"/dashboard"} style={activateLink(true)}>
          {t("Dashboard")}
        </NavLink>
      </div>
      <Styled.Right>
        <Select options={languageOptions} onChange={handleChange} />
        {/* {renderThemeSwitcher} */}
        {renderUserMenu}
      </Styled.Right>
    </Styled.Container>
  );
};

export default Navbar;
