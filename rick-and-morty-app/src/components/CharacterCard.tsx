import React from "react";
import "../index.css";
import { useTranslation } from "react-i18next";

interface CharacterCardProps {
  name: string;
  status: string;
  species: string;
  gender: string;
  origin: string;
}

const CharacterCard: React.FC<CharacterCardProps> = ({
  name,
  status,
  species,
  gender,
  origin,
}) => {
  const { t } = useTranslation();

  return (
    <div className="character-card">
      <h3>{name}</h3>
      <p>
        {t("filters.status")}: {status}
      </p>
      <p>
        {t("filters.species")}: {species}
      </p>
      <p>
        {t("filters.gender")}: {gender}
      </p>
      <p>
        {t("filters.origin")}: {origin}
      </p>
    </div>
  );
};

export default CharacterCard;
