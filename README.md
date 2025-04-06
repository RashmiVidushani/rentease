FINAL PROJECT Advanced Topics in Mobile Application Development (INFO-6132-(01)-25W)
Fanshawe College, London, ON, Canada

# RentEase 🏡

**RentEase** is a React Native mobile application built using **Expo** that helps users find rental accommodations with ease. It connects two types of users 
— **Owners**, who can post rental listings, and **Renters**, who can browse and favorite those listings.

This project was developed as a final group assignment for the Mobile Application Development course at Fanshawe College, demonstrating the practical use of React Native fundamentals, Firebase integration, and user authentication.

---

## ✨ Features

- 🔐 **User Authentication**
  - Login, Signup, Logout using Firebase Auth
  - Role-based interface (Owner vs. Renter)

- 🏘️ **Listing Management**
  - Owners can create and upload property listings with images
  - Renters can view all available listings

- 💾 **Data Persistence**
  - Listings and user data stored in Firebase Firestore
  - Session persistence using Firebase + AsyncStorage

- ⭐ **Favorites**
  - Renters can add listings to their favorites list

- 📞 **Contact Info**
  - Renters can view the owner’s contact information for each listing

---

## 🔧 Tech Stack

### Core Technologies
- **React Native with Expo**
- **Firebase (Auth + Firestore + Storage)**
- **React Navigation**

### Libraries & Tools Used
- `@react-native-async-storage/async-storage`
- `@react-navigation/native`, `@react-navigation/stack`, `@react-navigation/bottom-tabs`
- `firebase`
- `expo-image-picker` (for image uploads)
- `expo-location` (for optional location support)
- `expo-notifications` (for optional push notifications)
- `axios` (for API calls if needed)
- `react-native-dotenv` (for managing environment variables)
- `react-native-vector-icons` (for UI icons)
- `@expo-google-fonts/inter` (for custom fonts)

---

## 📱 Screens Overview

- **Login Screen** – Sign in with email and password
- **Signup Screen** – Register as an owner or renter
- **Home Screen** – View all listings (for renters)
- **My Listings** – Post and manage properties (for owners)
- **Browse Listings** - Displayed to the renters
- **Listing Detail** – View property details and contact info
- **Favorites** – View saved listings (for renters)
- **Profile** – Logout and manage account, Change Owner details so the renter can contact easily
- **Settings** - Turn on/off notifications
- **App-Icons** - Selecting App icons for the expo app (App is not published yet)

---

## 🗃️ Firebase Structure

- **Users Collection**
  - `uid`
    - `name`
    - `phone`
    - `email`
    - `imageUrl`
    - `role`: "owner" or "renter"

- **Listings Collection**
  - `listingId`
    - `addressline1`
    - `addressline2`
    - `costOfRent`
    - `availability`
    - `imageURL`
    - `imageUri`
    - `userId` (UID)
    - `numberOfRooms`
    - `postalCode`
    - `rentType`

- **Favorites Collection (optional per user)**
 - `listingId`
    - `addressline1`
    - `addressline2`
    - `costOfRent`
    - `availability`
    - `imageURL`
    - `imageUri`
    - `userId` (UID)
    - `numberOfRooms`
    - `postalCode`
    - `rentType`
      
---

## 🚀 Getting Started

### Prerequisites
- Node.js & npm
- Expo CLI (`npm install -g expo-cli`)
- Firebase Project (setup Firestore, Auth, and Storage)

### Installation

```bash
git clone https://github.com//rentease.git
cd rentease
npm install
expo start
