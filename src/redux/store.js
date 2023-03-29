import { configureStore } from "@reduxjs/toolkit";
import pokemonSlice from "./pokemonSlice";


export default store = configureStore({
    reducer: {
        pokemon: pokemonSlice,
    }
});
