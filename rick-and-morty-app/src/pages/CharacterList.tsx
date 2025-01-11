import React, { useState, useEffect, useRef } from "react";
import { useQuery, gql } from "@apollo/client";
import CharacterCard from "../components/CharacterCard";
import Filters from "../components/Filters";

const GET_CHARACTERS = gql`
  query GetCharacters($page: Int, $status: String, $species: String) {
    characters(page: $page, filter: { status: $status, species: $species }) {
      info {
        next
      }
      results {
        id
        name
        status
        species
        gender
        origin {
          name
        }
      }
    }
  }
`;

const CharacterList: React.FC = () => {
  const [characters, setCharacters] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [status, setStatus] = useState("");
  const [species, setSpecies] = useState("");
  const [sortOption, setSortOption] = useState("");
  const { data, loading, error, fetchMore } = useQuery(GET_CHARACTERS, {
    variables: { page, status, species },
    notifyOnNetworkStatusChange: true,
  });

  const observerRef = useRef<HTMLDivElement | null>(null);


  useEffect(() => {
    if (data && data.characters) {
      setCharacters((prev) => [...prev, ...data.characters.results]);
    }
  }, [data]);


  const sortCharacters = (characters: any[]) => {
    if (!characters) return [];

    switch (sortOption) {
      case "name_asc":
        return [...characters].sort((a, b) => a.name.localeCompare(b.name));
      case "name_desc":
        return [...characters].sort((a, b) => b.name.localeCompare(a.name));
      case "origin_asc":
        return [...characters].sort((a, b) =>
          a.origin.name.localeCompare(b.origin.name)
        );
      case "origin_desc":
        return [...characters].sort((a, b) =>
          b.origin.name.localeCompare(a.origin.name)
        );
      default:
        return characters;
    }
  };

  const sortedCharacters = sortCharacters(characters);

 
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && data?.characters.info.next) {
          setPage((prevPage) => prevPage + 1);
          fetchMore({
            variables: { page: data.characters.info.next },
          });
        }
      },
      { threshold: 1.0 }
    );

    if (observerRef.current) {
      observer.observe(observerRef.current);
    }

    return () => {
      if (observerRef.current) {
        observer.unobserve(observerRef.current);
      }
    };
  }, [data, fetchMore]);

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus);
    setCharacters([]);
    setPage(1);
  };

  const handleSpeciesChange = (newSpecies: string) => {
    setSpecies(newSpecies);
    setCharacters([]);
    setPage(1);
  };

  const handleSortChange = (newSortOption: string) => {
    setSortOption(newSortOption);
  };

  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <Filters
        status={status}
        species={species}
        sortOption={sortOption}
        onStatusChange={handleStatusChange}
        onSpeciesChange={handleSpeciesChange}
        onSortChange={handleSortChange}
      />
      <div className="character-list">
        {sortedCharacters.map((character: any) => (
          <CharacterCard
            key={character.id}
            name={character.name}
            status={character.status}
            species={character.species}
            gender={character.gender}
            origin={character.origin.name}
          />
        ))}
      </div>
      {loading && <p>Loading more...</p>}
      <div ref={observerRef} style={{ height: "1px" }} />
    </div>
  );
};

export default CharacterList;
