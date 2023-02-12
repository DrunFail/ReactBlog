import { makeAutoObservable } from "mobx";
import { Post } from "./components/interfaces/interfaces";

class Store {
    posts: Post[] = [];

    constructor() {
        makeAutoObservable(this)
    }

    addPost(title: string, body: string) {
        const newPost = {
            id: Date.now(),
            title,
            body
        }


        fetch(`https://jsonplaceholder.typicode.com/posts/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(newPost)
        })
            .then(response => {
                if (response.ok) {
                    this.posts.push(newPost)
                }
            })




    }

    removePost(id: number) {

        fetch(`https://jsonplaceholder.typicode.com/posts/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
        })
            .then(response => {
                if (response.ok) {
                    this.posts = this.posts.filter(post => post.id !== id)
                }
            })



    }

    editPost(editedItem: Post) {
        fetch(`https://jsonplaceholder.typicode.com/posts/${editedItem.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json; charset=utf-8'
            },
            body: JSON.stringify(editedItem)
        })
            .then(response => {
                if (response.ok) {
                    this.posts = this.posts.map(post => {

                        if (post.id !== editedItem.id) {

                            return post
                        } else {
                            return editedItem
                        }
                    })
                }
            })
    }



    fetchPosts(selectedPage: number, limitPostOnPage: number, search: string = '') {
        fetch(`https://jsonplaceholder.typicode.com/posts?`
            +
            (search
                ? `q=${search}`
                : `_page=${selectedPage}&_limit=${limitPostOnPage}`))
            .then(response => response.json())
            .then(json => {
                this.posts = json
            })

    }

}

const store = new Store();
export default store;