import firebase from 'firebase'
import { ref, onUnmounted } from 'vue'

const config = {
  apiKey: 'AIzaSyDosNqPG8xLynCcpG4VKCqZzR0a4B9XszE',
  authDomain: 'vue-3-crud-3d11d.firebaseapp.com',
  databaseURL: 'https://vue-3-crud-3d11d-default-rtdb.asia-southeast1.firebasedatabase.app',
  projectId: 'vue-3-crud-3d11d',
  storageBucket: 'vue-3-crud-3d11d.appspot.com',
  messagingSenderId: '939880081981',
  appId: '1:939880081981:web:b82ab358f9c7dc0242d854',
  measurementId: 'G-R4LS752FJP'
}
const firebaseApp = firebase.initializeApp(config)

const db = firebaseApp.firestore()
const usersCollection = db.collection('users')

export const createUser = user => {
  return usersCollection.add(user)
}

export const getUser = async id => {
  const user = await usersCollection.doc(id).get()
  return user.exists ? user.data() : null
}

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user)
}

export const deleteUser = id => {
  return usersCollection.doc(id).delete()
}

export const useLoadUsers = () => {
  const users = ref([])
  const close = usersCollection.onSnapshot(snapshot => {
    users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return users
}
