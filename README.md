# Character Search Application

This project is a React-based application that allows users to search for characters from the "Rick and Morty" series using an autocomplete component. It uses the [Rick and Morty API](https://rickandmortyapi.com/) to fetch character data. Users can select characters from autocomplete search results, manage selected characters, and handle various keyboard interactions for a seamless user experience.

## Features

- **Autocomplete Search**: Search characters by name using an input field that autocompletes based on live results from the API.
- **Keyboard Navigation**: Navigate through autocomplete results using arrow keys and select characters using the Enter or Space key.
- **Manage Selected Characters**: Add or remove characters from a selected list displayed below the search bar.
- **Accessibility Enhancements**: Implements accessible components with appropriate ARIA roles and keyboard interactions.
- **Responsive UI**: Mobile-responsive design that adjusts layout and components for various screen sizes.

## Technologies Used

- **React**: For building the user interface.
- **TypeScript**: For static type checking.
- **Next.js**: For server-side rendering and routing.
- **Framer Motion**: For animation effects.
- **TanStack React Query**: For managing server state, caching, and background updates.
- **Tailwind CSS**: For styling and designing the frontend.
- **ShadCN UI**: For building accessible components.

## Setup and Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/ariburaco/adcreative-case
   cd adcreative-case
   ```

2. **Install dependencies:**

   ```bash
   pnpm install
   ```

3. **Run the development server:**

   ```bash
   pnpm dev
   ```

4. **Open the application:**

   Development server will be available at [http://localhost:3000](http://localhost:3000).

   Live demo available at [https://adcreative-case-rho.vercel.app](https://adcreative-case-rho.vercel.app).

## Usage

- **Start Typing:** Begin by typing a character's name in the search input.
- **Navigate Results:** Use the up and down arrow keys to navigate through the autocomplete results.
- **Select/Deselect Characters:** Press Enter or Space to select a character, or click directly on the character card.
- **Manage Selected Characters:** View selected characters below the search bar, and remove them by clicking the 'X' icon next to each name.
