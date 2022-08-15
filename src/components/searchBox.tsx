import { ChangeEvent } from "react";
import { FunctionComponent } from "react";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useGoogleMapsScript, Libraries } from "use-google-maps-script";

// Library for displaying the google search elements
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";

interface ISearchBoxProps {
  onSelectAddress: (
    address: string,
    latitude: number | null,
    longitude: number | null
  ) => void;
  defaultValue: string;
}

const libraries: Libraries = ["places"];

const SearchBox: React.FC<ISearchBoxProps> = ({
  onSelectAddress,
  defaultValue,
}) => {
  const { isLoaded, loadError } = useGoogleMapsScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY ?? "",
    libraries,
  });

  if (!isLoaded) return null;
  if (loadError) return <span className="block">Error Loading</span>;
  return (
    <ReadySearchBox
      defaultValue={defaultValue}
      onSelectAddress={onSelectAddress}
    />
  );
};

const ReadySearchBox: React.FC<ISearchBoxProps> = ({
  defaultValue,
  onSelectAddress,
}) => {
  const {
    setValue,
    value,
    suggestions: { status, data },
    ready,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300 /* prevents too many requests */,
    defaultValue,
  });

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      onSelectAddress(address, lat, lng);
    } catch (error) {
      return console.error({ error });
    }
  };
  console.log({ status, data });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    if (!e.target.value) {
      onSelectAddress("", null, null);
    }
  };

  return (
    <Combobox onSelect={handleSelect}>
      <ComboboxInput
        id="search"
        value={value}
        onChange={handleChange}
        disabled={!ready}
        placeholder="Search your location"
        className="w-full p-2"
        autoComplete="off"
      />
      <ComboboxPopover>
        <ComboboxList>
          {status == "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption value={description} key={place_id} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

export { SearchBox };
