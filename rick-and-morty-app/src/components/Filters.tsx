import React from "react";
import { useTranslation } from "react-i18next";

interface FiltersProps {
  status: string;
  species: string;
  sortOption: string;
  onStatusChange: (status: string) => void;
  onSpeciesChange: (species: string) => void;
  onSortChange: (sortOption: string) => void;
}

const Filters: React.FC<FiltersProps> = ({
  status,
  species,
  sortOption,
  onStatusChange,
  onSpeciesChange,
  onSortChange,
}) => {
  const { t } = useTranslation();

  return (
    <div className="filters">
      <div className="filter-item">
        <label htmlFor="status">{t("filters.status")}: </label>
        <select
          id="status"
          value={status}
          onChange={(e) => onStatusChange(e.target.value)}
        >
          <option value="">{t("filters.all")}</option>{" "}
          <option value="Alive">{t("filters.alive")}</option>
          <option value="Dead">{t("filters.dead")}</option>
          <option value="unknown">{t("filters.unknown")}</option>
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="species">{t("filters.species")}: </label>{" "}
        <select
          id="species"
          value={species}
          onChange={(e) => onSpeciesChange(e.target.value)}
        >
          <option value="">{t("filters.all")}</option>{" "}
          <option value="Human">Human</option>
          <option value="Alien">Alien</option>
          <option value="Humanoid">Humanoid</option>
          <option value="Poopybutthole">Poopybutthole</option>
          <option value="Mythological Creature">Mythological Creature</option>
          <option value="Robot">Robot</option>
          <option value="Cronenberg">Cronenberg</option>
        </select>
      </div>

      <div className="filter-item">
        <label htmlFor="sort">{t("filters.sortBy")}: </label>
        <select
          id="sort"
          value={sortOption}
          onChange={(e) => onSortChange(e.target.value)}
        >
          <option value="">{t("filters.all")}</option>{" "}
          <option value="name_asc">{t("filters.nameAsc")}</option>
          <option value="name_desc">{t("filters.nameDesc")}</option>
          <option value="origin_asc">{t("filters.originAsc")}</option>
          <option value="origin_desc">{t("filters.originDesc")}</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
