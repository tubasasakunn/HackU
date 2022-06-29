import { createContext, useState } from "react";

export const SelectedTagContext = createContext({});

export const SelectedTagProvider = (props) => {
    const { children } = props;
    const [selectedTag, setSelectedTag] = useState("");
    return(
        <SelectedTagContext.Provider value={{selectedTag, setSelectedTag}}>
            { children }
        </SelectedTagContext.Provider>
    );
};