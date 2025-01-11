import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "../styles/global.css";

const Footer: React.FC = () => {
  const { i18n } = useTranslation();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFooterExpanded, setIsFooterExpanded] = useState(false);

  const handleLanguageChange = (lang: string) => {
    i18n.changeLanguage(lang);
    setIsDropdownOpen(false);
    setTimeout(() => setIsFooterExpanded(false), 300);
  };

  return (
    <footer className={`footer ${isFooterExpanded ? "expanded" : ""}`}>
      <div
        className="language-selector"
        onClick={() => setIsFooterExpanded(true)}
        onMouseEnter={() => setIsDropdownOpen(true)}
        onMouseLeave={() => setIsDropdownOpen(false)}
      >
        <button className="language-button">🌐Select Language</button>
        {isDropdownOpen && (
          <ul className="language-dropdown">
            <li
              onClick={() => handleLanguageChange("en")}
              className="language-option"
            >
              <img
                src="https://flagcdn.com/w40/us.png"
                alt="English"
                className="language-flag"
              />
              English
            </li>
            <li
              onClick={() => handleLanguageChange("de")}
              className="language-option"
            >
              <img
                src="https://flagcdn.com/w40/de.png"
                alt="Deutsch"
                className="language-flag"
              />
              Deutsch
            </li>
          </ul>
        )}
      </div>
    </footer>
  );
};

export default Footer;
