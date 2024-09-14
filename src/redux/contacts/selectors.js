/* import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [selectContacts, (state) => state.filters.name],
  (contacts, filter) =>
    contacts.filter((contact) =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    )
);
 */
import { createSelector } from "@reduxjs/toolkit";

export const selectContacts = (state) => state.contacts.items;
export const selectLoading = (state) => state.contacts.loading;
export const selectError = (state) => state.contacts.error;

export const selectFilteredContacts = createSelector(
  [
    selectContacts,
    (state) => state.filters.name,
    (state) => state.filters.number,
  ],
  (contacts, nameFilter, numberFilter) => {
    return contacts.filter((contact) => {
      const nameMatches = contact.name
        .toLowerCase()
        .includes(nameFilter.toLowerCase());
      const numberMatches = numberFilter
        ? contact.number.startsWith(numberFilter)
        : true;
      return nameMatches && numberMatches;
    });
  }
);
