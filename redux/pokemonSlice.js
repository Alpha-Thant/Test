import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const API_URL = 'https://api.pokemontcg.io/v2/cards?q=name:gardevoir';
export const fetchPokemon = createAsyncThunk('pokemon/fetchPokemon', async () => {
	return fetch(API_URL) 
        .then((resp) => resp.json())
        .catch((err) => console.log(err));
});

const pokemonSlice = createSlice({
  name: 'pokemon',
  initialState: {
    pokemons: [],
    status: 'idle',
    showModal: false,
    paidModal: false,
    selectedCardList: [],
    totalCard: 0,
    totalPrice: 0,
  },
  reducers: {
    pokemonAdd(state, action){
        state.pokemons.push(action.payload)    
    },
    showModalUpdate(state, action) {
        state.showModal = action.payload;
    },
    paidModalUpdate(state, action) {
      if(action.payload) {

        // It's paid and remove from the card
        state.selectedCardList = [];
        state.totalPrice = 0;
        state.totalCard = 0;
        state.showModal = false;
      }
      state.paidModal = action.payload;
    },
    cardAdd(state, action){
      state.selectedCardList.push(action.payload);
      state.totalCard += 1;
      state.totalPrice += action.payload.price;
    },
    cardRemove(state, action){
      const index = state.selectedCardList.findIndex((card) => card.id === action.payload.id);

      if(index > -1) {
        state.selectedCardList.splice(index, 1); // deleting
        state.totalCard -= 1;
        state.totalPrice -= action.payload.price;
      }
    },    
    clearCardList(state) {
      state.selectedCardList = [];
      state.totalPrice = 0;
      state.totalCard = 0;
    },
    totalCardAdd(state, action) {
      state.totalCard += action.payload;
    },
    totalCardRemove(state, action) {
      state.totalCard -= action.payload;
    },
    totalPriceAdd(state, action) {
      state.totalPrice += action.payload;
    },
    totalPriceRemove(state, action) {
      state.totalPrice -= action.payload;
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchPokemon.pending, (state, action) => {
        state.status = 'loading'
      })
      .addCase(fetchPokemon.fulfilled, (state, action) => {
        state.status = 'succeeded'
        // Add any fetched posts to the array
        state.pokemons = state.pokemons.concat(action.payload.data)
      })
      .addCase(fetchPokemon.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
  }
})
export const { pokemonAdd, showModalUpdate, paidModalUpdate, cardAdd, cardRemove, clearCardList, totalCardAdd, totalPriceAdd, totalCardRemove, totalPriceRemove } = pokemonSlice.actions
export default pokemonSlice.reducer