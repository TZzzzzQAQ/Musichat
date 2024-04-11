import React, {useState} from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined,
} from '@ant-design/icons';
import {Layout, Menu, Button, theme, Avatar, Select, Form} from 'antd';
import './index.scss'
import {Outlet, useLocation, useNavigate} from "react-router-dom";
import PlayBar from "src/pages/PlayBar";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {Input} from 'antd';
import {setSearchResult} from "@/store/features/musicSlice";
import {useDispatch} from "react-redux";
import {
    faClock, faCompactDisc,
    faGear,
    faHeart, faHouse,
    faList,
    faMagnifyingGlass, faMicrophoneLines,
    faRecordVinyl,
    faUser
} from "@fortawesome/free-solid-svg-icons";

const {Search} = Input;


const someData = {
    "artists": {
        "href": "https://api.spotify.com/v1/search?query=Taylor&type=artist&market=NZ&locale=en-NZ%2Cen%3Bq%3D0.9%2Czh-CN%3Bq%3D0.8%2Czh%3Bq%3D0.7&offset=0&limit=20",
        "limit": 20,
        "next": "https://api.spotify.com/v1/search?query=Taylor&type=artist&market=NZ&locale=en-NZ%2Cen%3Bq%3D0.9%2Czh-CN%3Bq%3D0.8%2Czh%3Bq%3D0.7&offset=20&limit=20",
        "offset": 0,
        "previous": null,
        "total": 38,
        "items": [
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/06HL4z0CvFAxyc27GXpf02"
                },
                "followers": {
                    "href": null,
                    "total": 106631992
                },
                "genres": ["pop"],
                "href": "https://api.spotify.com/v1/artists/06HL4z0CvFAxyc27GXpf02",
                "id": "06HL4z0CvFAxyc27GXpf02",
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab6761610000e5ebe672b5f553298dcdccb0e676",
                        "height": 640,
                        "width": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616100005174e672b5f553298dcdccb0e676",
                        "height": 320,
                        "width": 320
                    },
                    {
                        "url": "https://i.scdn.co/image/ab6761610000f178e672b5f553298dcdccb0e676",
                        "height": 160,
                        "width": 160
                    }
                ],
                "name": "Taylor Swift",
                "popularity": 100,
                "type": "artist",
                "uri": "spotify:artist:06HL4z0CvFAxyc27GXpf02"
            },
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/6eUKZXaKkcviH0Ku9w2n3V"
                },
                "followers": {
                    "href": null,
                    "total": 113637215
                },
                "genres": ["pop", "singer-songwriter pop", "uk pop"],
                "href": "https://api.spotify.com/v1/artists/6eUKZXaKkcviH0Ku9w2n3V",
                "id": "6eUKZXaKkcviH0Ku9w2n3V",
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab6761610000e5eb3bcef85e105dfc42399ef0ba",
                        "height": 640,
                        "width": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab676161000051743bcef85e105dfc42399ef0ba",
                        "height": 320,
                        "width": 320
                    },
                    {
                        "url": "https://i.scdn.co/image/ab6761610000f1783bcef85e105dfc42399ef0ba",
                        "height": 160,
                        "width": 160
                    }
                ],
                "name": "Ed Sheeran",
                "popularity": 87,
                "type": "artist",
                "uri": "spotify:artist:6eUKZXaKkcviH0Ku9w2n3V"
            },
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/1uNFoZAHBGtllmzznpCI3s"
                },
                "followers": {
                    "href": null,
                    "total": 74360609
                },
                "genres": ["canadian pop", "pop"],
                "href": "https://api.spotify.com/v1/artists/1uNFoZAHBGtllmzznpCI3s",
                "id": "1uNFoZAHBGtllmzznpCI3s",
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab6761610000e5eb8ae7f2aaa9817a704a87ea36",
                        "height": 640,
                        "width": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab676161000051748ae7f2aaa9817a704a87ea36",
                        "height": 320,
                        "width": 320
                    },
                    {
                        "url": "https://i.scdn.co/image/ab6761610000f1788ae7f2aaa9817a704a87ea36",
                        "height": 160,
                        "width": 160
                    }
                ],
                "name": "Justin Bieber",
                "popularity": 89,
                "type": "artist",
                "uri": "spotify:artist:1uNFoZAHBGtllmzznpCI3s"
            },
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/66CXWjxzNUsdJxJ2JdwvnR"
                },
                "followers": {
                    "href": null,
                    "total": 95631707
                },
                "genres": ["pop"],
                "href": "https://api.spotify.com/v1/artists/66CXWjxzNUsdJxJ2JdwvnR",
                "id": "66CXWjxzNUsdJxJ2JdwvnR",
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab6761610000e5eb40b5c07ab77b6b1a9075fdc0",
                        "height": 640,
                        "width": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab6761610000517440b5c07ab77b6b1a9075fdc0",
                        "height": 320,
                        "width": 320
                    },
                    {
                        "url": "https://i.scdn.co/image/ab6761610000f17840b5c07ab77b6b1a9075fdc0",
                        "height": 160,
                        "width": 160
                    }
                ],
                "name": "Ariana Grande",
                "popularity": 95,
                "type": "artist",
                "uri": "spotify:artist:66CXWjxzNUsdJxJ2JdwvnR"
            },
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/1Xyo4u8uXC1ZmMpatF05PJ"
                },
                "followers": {
                    "href": null,
                    "total": 81533150
                },
                "genres": ["canadian contemporary r&b", "canadian pop", "pop"],
                "href": "https://api.spotify.com/v1/artists/1Xyo4u8uXC1ZmMpatF05PJ",
                "id": "1Xyo4u8uXC1ZmMpatF05PJ",
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb",
                        "height": 640,
                        "width": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616100005174214f3cf1cbe7139c1e26ffbb",
                        "height": 320,
                        "width": 320
                    },
                    {
                        "url": "https://i.scdn.co/image/ab6761610000f178214f3cf1cbe7139c1e26ffbb",
                        "height": 160,
                        "width": 160
                    }
                ],
                "name": "The Weeknd",
                "popularity": 95,
                "type": "artist",
                "uri": "spotify:artist:1Xyo4u8uXC1ZmMpatF05PJ"
            },
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/0C8ZW7ezQVs4URX5aX7Kqx"
                },
                "followers": {
                    "href": null,
                    "total": 48759124
                },
                "genres": ["pop", "post-teen pop"],
                "href": "https://api.spotify.com/v1/artists/0C8ZW7ezQVs4URX5aX7Kqx",
                "id": "0C8ZW7ezQVs4URX5aX7Kqx",
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab6761610000e5ebc3c753851496854e29abff7a",
                        "height": 640,
                        "width": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616100005174c3c753851496854e29abff7a",
                        "height": 320,
                        "width": 320
                    },
                    {
                        "url": "https://i.scdn.co/image/ab6761610000f178c3c753851496854e29abff7a",
                        "height": 160,
                        "width": 160
                    }
                ],
                "name": "Selena Gomez",
                "popularity": 82,
                "type": "artist",
                "uri": "spotify:artist:0C8ZW7ezQVs4URX5aX7Kqx"
            },
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/6jJ0s89eD6GaHleKKya26X"
                },
                "followers": {
                    "href": null,
                    "total": 32422477
                },
                "genres": ["pop"],
                "href": "https://api.spotify.com/v1/artists/6jJ0s89eD6GaHleKKya26X",
                "id": "6jJ0s89eD6GaHleKKya26X",
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab6761610000e5ebdc9dcb7e4a97b4552e1224d6",
                        "height": 640,
                        "width": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616100005174dc9dcb7e4a97b4552e1224d6",
                        "height": 320,
                        "width": 320
                    },
                    {
                        "url": "https://i.scdn.co/image/ab6761610000f178dc9dcb7e4a97b4552e1224d6",
                        "height": 160,
                        "width": 160
                    }
                ],
                "name": "Katy Perry",
                "popularity": 84,
                "type": "artist",
                "uri": "spotify:artist:6jJ0s89eD6GaHleKKya26X"
            },
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/1KCSPY1glIKqW2TotWuXOR"
                },
                "followers": {
                    "href": null,
                    "total": 16397959
                },
                "genres": ["dance pop", "pop"],
                "href": "https://api.spotify.com/v1/artists/1KCSPY1glIKqW2TotWuXOR",
                "id": "1KCSPY1glIKqW2TotWuXOR",
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab6761610000e5eb7bbad89a61061304ec842588",
                        "height": 640,
                        "width": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab676161000051747bbad89a61061304ec842588",
                        "height": 320,
                        "width": 320
                    },
                    {
                        "url": "https://i.scdn.co/image/ab6761610000f1787bbad89a61061304ec842588",
                        "height": 160,
                        "width": 160
                    }
                ],
                "name": "P!nk",
                "popularity": 81,
                "type": "artist",
                "uri": "spotify:artist:1KCSPY1glIKqW2TotWuXOR"
            },
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/6M2wZ9GZgrQXHCFfjv46we"
                },
                "followers": {
                    "href": null,
                    "total": 42966507
                },
                "genres": ["dance pop", "pop", "uk pop"],
                "href": "https://api.spotify.com/v1/artists/6M2wZ9GZgrQXHCFfjv46we",
                "id": "6M2wZ9GZgrQXHCFfjv46we",
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab6761610000e5eb0c68f6c95232e716f0abee8d",
                        "height": 640,
                        "width": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab676161000051740c68f6c95232e716f0abee8d",
                        "height": 320,
                        "width": 320
                    },
                    {
                        "url": "https://i.scdn.co/image/ab6761610000f1780c68f6c95232e716f0abee8d",
                        "height": 160,
                        "width": 160
                    }
                ],
                "name": "Dua Lipa",
                "popularity": 88,
                "type": "artist",
                "uri": "spotify:artist:6M2wZ9GZgrQXHCFfjv46we"
            },
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/4AK6F7OLvEQ5QYCBNiQWHq"
                },
                "followers": {
                    "href": null,
                    "total": 34528470
                },
                "genres": ["boy band", "pop", "post-teen pop", "talent show"],
                "href": "https://api.spotify.com/v1/artists/4AK6F7OLvEQ5QYCBNiQWHq",
                "id": "4AK6F7OLvEQ5QYCBNiQWHq",
                "images": [
                    {
                        "url": "https://i.scdn.co/image/5bb443424a1ad71603c43d67f5af1a04da6bb3c8",
                        "height": 1000,
                        "width": 1000
                    },
                    {
                        "url": "https://i.scdn.co/image/289c7f686f5b78ceeb224453cf9a15697a678a79",
                        "height": 640,
                        "width": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/45741ba38b51130bb96e00c0e24d17ba311a9293",
                        "height": 200,
                        "width": 200
                    },
                    {
                        "url": "https://i.scdn.co/image/6c89c662ad0ab75bc2af9a3ae2b16f811daced50",
                        "height": 64,
                        "width": 64
                    }
                ],
                "name": "One Direction",
                "popularity": 84,
                "type": "artist",
                "uri": "spotify:artist:4AK6F7OLvEQ5QYCBNiQWHq"
            },
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/1McMsnEElThX1knmY4oliG"
                },
                "followers": {
                    "href": null,
                    "total": 34689189
                },
                "genres": ["pop"],
                "href": "https://api.spotify.com/v1/artists/1McMsnEElThX1knmY4oliG",
                "id": "1McMsnEElThX1knmY4oliG",
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab6761610000e5ebe03a98785f3658f0b6461ec4",
                        "height": 640,
                        "width": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616100005174e03a98785f3658f0b6461ec4",
                        "height": 320,
                        "width": 320
                    },
                    {
                        "url": "https://i.scdn.co/image/ab6761610000f178e03a98785f3658f0b6461ec4",
                        "height": 160,
                        "width": 160
                    }
                ],
                "name": "Olivia Rodrigo",
                "popularity": 90,
                "type": "artist",
                "uri": "spotify:artist:1McMsnEElThX1knmY4oliG"
            },
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/1OUylyH2arsswxRe6dOz3i"
                },
                "followers": {
                    "href": null,
                    "total": 13233
                },
                "genres": ["christian indie", "roots worship"],
                "href": "https://api.spotify.com/v1/artists/1OUylyH2arsswxRe6dOz3i",
                "id": "1OUylyH2arsswxRe6dOz3i",
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab6761610000e5ebd50e21a4820c9a62be8a41e5",
                        "height": 640,
                        "width": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616100005174d50e21a4820c9a62be8a41e5",
                        "height": 320,
                        "width": 320
                    },
                    {
                        "url": "https://i.scdn.co/image/ab6761610000f178d50e21a4820c9a62be8a41e5",
                        "height": 160,
                        "width": 160
                    }
                ],
                "name": "Taylor Leonhardt",
                "popularity": 45,
                "type": "artist",
                "uri": "spotify:artist:1OUylyH2arsswxRe6dOz3i"
            },
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/73r6cgVUoNL47qnJAF0Ihw"
                },
                "followers": {
                    "href": null,
                    "total": 19749
                },
                "genres": [],
                "href": "https://api.spotify.com/v1/artists/73r6cgVUoNL47qnJAF0Ihw",
                "id": "73r6cgVUoNL47qnJAF0Ihw",
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab6761610000e5ebb378225982ff43ec737f657c",
                        "height": 640,
                        "width": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616100005174b378225982ff43ec737f657c",
                        "height": 320,
                        "width": 320
                    },
                    {
                        "url": "https://i.scdn.co/image/ab6761610000f178b378225982ff43ec737f657c",
                        "height": 160,
                        "width": 160
                    }
                ],
                "name": "Taylor John Williams",
                "popularity": 41,
                "type": "artist",
                "uri": "spotify:artist:73r6cgVUoNL47qnJAF0Ihw"
            },
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/0vn7UBvSQECKJm2817Yf1P"
                },
                "followers": {
                    "href": null,
                    "total": 2555525
                },
                "genres": ["classic rock", "folk", "folk rock", "heartland rock", "mellow gold", "singer-songwriter", "soft rock"],
                "href": "https://api.spotify.com/v1/artists/0vn7UBvSQECKJm2817Yf1P",
                "id": "0vn7UBvSQECKJm2817Yf1P",
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab6761610000e5eb5921cb8f2ec7bf6b5e725bcc",
                        "height": 640,
                        "width": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab676161000051745921cb8f2ec7bf6b5e725bcc",
                        "height": 320,
                        "width": 320
                    },
                    {
                        "url": "https://i.scdn.co/image/ab6761610000f1785921cb8f2ec7bf6b5e725bcc",
                        "height": 160,
                        "width": 160
                    }
                ],
                "name": "James Taylor",
                "popularity": 67,
                "type": "artist",
                "uri": "spotify:artist:0vn7UBvSQECKJm2817Yf1P"
            },
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/58nB2Z6IiDdTUTwHYw56xI"
                },
                "followers": {
                    "href": null,
                    "total": 190869
                },
                "genres": ["redneck"],
                "href": "https://api.spotify.com/v1/artists/58nB2Z6IiDdTUTwHYw56xI",
                "id": "58nB2Z6IiDdTUTwHYw56xI",
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab6761610000e5eba0fc6e8727e4183e95e344f7",
                        "height": 640,
                        "width": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616100005174a0fc6e8727e4183e95e344f7",
                        "height": 320,
                        "width": 320
                    },
                    {
                        "url": "https://i.scdn.co/image/ab6761610000f178a0fc6e8727e4183e95e344f7",
                        "height": 160,
                        "width": 160
                    }
                ],
                "name": "Taylor Ray Holbrook",
                "popularity": 52,
                "type": "artist",
                "uri": "spotify:artist:58nB2Z6IiDdTUTwHYw56xI"
            },
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/3Fxg10eJ6YmvUdM2PPB4Zk"
                },
                "followers": {
                    "href": null,
                    "total": 57466
                },
                "genres": ["alt z"],
                "href": "https://api.spotify.com/v1/artists/3Fxg10eJ6YmvUdM2PPB4Zk",
                "id": "3Fxg10eJ6YmvUdM2PPB4Zk",
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab6761610000e5eb93cafdde6300eb506469d41c",
                        "height": 640,
                        "width": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab6761610000517493cafdde6300eb506469d41c",
                        "height": 320,
                        "width": 320
                    },
                    {
                        "url": "https://i.scdn.co/image/ab6761610000f17893cafdde6300eb506469d41c",
                        "height": 160,
                        "width": 160
                    }
                ],
                "name": "Taylor Bickett",
                "popularity": 46,
                "type": "artist",
                "uri": "spotify:artist:3Fxg10eJ6YmvUdM2PPB4Zk"
            },
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/32lVGr0fSRGT6okLKHiP68"
                },
                "followers": {
                    "href": null,
                    "total": 455955
                },
                "genres": ["freestyle", "hi-nrg", "new romantic", "new wave pop", "soft rock", "synthpop"],
                "href": "https://api.spotify.com/v1/artists/32lVGr0fSRGT6okLKHiP68",
                "id": "32lVGr0fSRGT6okLKHiP68",
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab6761610000e5eb7876b413b088e79051857d19",
                        "height": 640,
                        "width": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab676161000051747876b413b088e79051857d19",
                        "height": 320,
                        "width": 320
                    },
                    {
                        "url": "https://i.scdn.co/image/ab6761610000f1787876b413b088e79051857d19",
                        "height": 160,
                        "width": 160
                    }
                ],
                "name": "Taylor Dayne",
                "popularity": 57,
                "type": "artist",
                "uri": "spotify:artist:32lVGr0fSRGT6okLKHiP68"
            },
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/1A0WloDoRE88uUwo3wensY"
                },
                "followers": {
                    "href": null,
                    "total": 185410
                },
                "genres": ["singer-songwriter pop"],
                "href": "https://api.spotify.com/v1/artists/1A0WloDoRE88uUwo3wensY",
                "id": "1A0WloDoRE88uUwo3wensY",
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab6761610000e5eb3d1f3185b5794b933352c733",
                        "height": 640,
                        "width": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab676161000051743d1f3185b5794b933352c733",
                        "height": 320,
                        "width": 320
                    },
                    {
                        "url": "https://i.scdn.co/image/ab6761610000f1783d1f3185b5794b933352c733",
                        "height": 160,
                        "width": 160
                    }
                ],
                "name": "Taylor Acorn",
                "popularity": 55,
                "type": "artist",
                "uri": "spotify:artist:1A0WloDoRE88uUwo3wensY"
            },
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/6kk3eFuZoE4Lq7dD03Ehkj"
                },
                "followers": {
                    "href": null,
                    "total": 5500
                },
                "genres": ["australian country"],
                "href": "https://api.spotify.com/v1/artists/6kk3eFuZoE4Lq7dD03Ehkj",
                "id": "6kk3eFuZoE4Lq7dD03Ehkj",
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab6761610000e5ebf3ef1e05efb540e1bde9d923",
                        "height": 640,
                        "width": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab67616100005174f3ef1e05efb540e1bde9d923",
                        "height": 320,
                        "width": 320
                    },
                    {
                        "url": "https://i.scdn.co/image/ab6761610000f178f3ef1e05efb540e1bde9d923",
                        "height": 160,
                        "width": 160
                    }
                ],
                "name": "Taylor Moss",
                "popularity": 35,
                "type": "artist",
                "uri": "spotify:artist:6kk3eFuZoE4Lq7dD03Ehkj"
            },
            {
                "external_urls": {
                    "spotify": "https://open.spotify.com/artist/1f0vGTFXE64SLuypBV8zB0"
                },
                "followers": {
                    "href": null,
                    "total": 12320
                },
                "genres": ["broadway", "show tunes"],
                "href": "https://api.spotify.com/v1/artists/1f0vGTFXE64SLuypBV8zB0",
                "id": "1f0vGTFXE64SLuypBV8zB0",
                "images": [
                    {
                        "url": "https://i.scdn.co/image/ab6761610000e5eb1a15c0765808044ffc633803",
                        "height": 640,
                        "width": 640
                    },
                    {
                        "url": "https://i.scdn.co/image/ab676161000051741a15c0765808044ffc633803",
                        "height": 320,
                        "width": 320
                    },
                    {
                        "url": "https://i.scdn.co/image/ab6761610000f1781a15c0765808044ffc633803",
                        "height": 160,
                        "width": 160
                    }
                ],
                "name": "Taylor Louderman",
                "popularity": 53,
                "type": "artist",
                "uri": "spotify:artist:1f0vGTFXE64SLuypBV8zB0"
            }
        ]
    }
}

const {
    Header,
    Sider,
    Content,
    Footer
} = Layout;

const iconColor = {color: "#74C0FC"};

const item = [
    {
        key: '1',
        icon: <FontAwesomeIcon icon={faUser} style={iconColor}/>,
        label: 'User',
        children: [
            {
                key: '/account',
                icon: <FontAwesomeIcon icon={faUser} style={iconColor}/>,
                label: 'Account',
            },
            {
                key: '/setting',
                icon: <FontAwesomeIcon icon={faGear} style={iconColor}/>,
                label: 'Setting'
            }
        ]
    },
    {
        key: '2',
        icon: <FontAwesomeIcon icon={faRecordVinyl} style={iconColor}/>,
        label: 'Library',
        children: [
            {
                key: '/recent',
                icon: <FontAwesomeIcon icon={faClock} style={iconColor}/>,
                label: 'Recent'
            },
            {
                key: '/favourite',
                icon: <FontAwesomeIcon icon={faHeart} style={iconColor}/>,
                label: 'Favourite'
            }, {
                key: '/playlist',
                icon: <FontAwesomeIcon icon={faList} style={iconColor}/>,
                label: 'Playlist'
            }
        ]
    },
    {
        key: '3',
        icon: <FontAwesomeIcon icon={faMagnifyingGlass} style={iconColor}/>,
        label: 'Discovery',
        children: [
            {
                key: '/home',
                icon: <FontAwesomeIcon icon={faHouse} style={iconColor}/>,
                label: 'Home'
            }, {
                key: '/artist',
                icon: <FontAwesomeIcon icon={faMicrophoneLines} style={iconColor}/>,
                label: 'Artist'
            }, {
                key: '/album',
                icon: <FontAwesomeIcon icon={faCompactDisc} style={iconColor}/>,
                label: 'Album'
            }, {
                key: '/searchResult',
                icon: <FontAwesomeIcon icon={faMagnifyingGlass} style={iconColor}/>,
                label: 'Search'
            }
        ]
    }
]

const options = [
    {
        value: 'Album',
        label: 'Album',
    },
    {
        value: 'Artist',
        label: 'Artist',
    },
    {
        value: 'Track',
        label: 'Track',
    }
]

const AppContainer = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [searchData, setSearchData] = useState({
        q: 'Taylor Swift',
        type: 'Artist',
        market: 'NZ',
        limit: 10,
        offset: 5
    })
    const [collapsed, setCollapsed] = useState(false);

    const dispatch = useDispatch();

    const navigate = useNavigate()

    const {
        token: {colorBgContainer, borderRadiusLG},
    } = theme.useToken();

    const location = useLocation();

    const clickHandler = (e) => {
        navigate(e.key, {replace: true})
    }

    const avatarClickHandler = () => {
        navigate('/account', {replace: true})
    }

    const handleSelectChange = (value) => {
        setSearchData(prevState => {
            return {
                ...prevState,
                type: value
            }
        })
    }
    const handleSearchChange = ({target: {value}}) => {
        setSearchData(prevState => {
            return {
                ...prevState,
                q: value
            }
        })
    }
    const onSearch = async (value, _e, info) => {
        setIsLoading(true);
        try {
            console.log(searchData);
            //请求
            dispatch(setSearchResult(JSON.parse(JSON.stringify(someData))));
        } catch (error) {
            console.error('请求错误', error);
        } finally {
            setIsLoading(false);
            navigate('/searchResult', {replace: true, state: {someData: JSON.parse(JSON.stringify(someData))}})
        }
    }
    return (
        <Layout>
            <Sider
                trigger={null}
                collapsible
                collapsed={collapsed}
                style={{
                    background: colorBgContainer,
                    height: '100 %',
                    borderRadius: '10px',
                }}
                className="custom-sider">
                <div className="demo-logo-vertical"/>
                <Menu
                    mode="inline"
                    defaultSelectedKeys={['1']}
                    items={item}
                    onClick={clickHandler}
                    selectedKeys={[location.pathname]}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        background: colorBgContainer,
                        margin: '16px',
                        padding: '0px 12px',
                        borderRadius: borderRadiusLG,
                    }}
                    className={'flex-center'}
                >
                    <Button
                        type="text"
                        icon={collapsed ? <MenuUnfoldOutlined/> : <MenuFoldOutlined/>}
                        onClick={() => setCollapsed(!collapsed)}
                        style={{
                            ...iconColor,
                            fontSize: '16px',
                            width: '32px',
                            height: '32px',
                        }}
                    />
                    <Form className={"flex-center gap-4 mx-4"}>
                        <Search
                            value={searchData.q}
                            onChange={handleSearchChange}
                            placeholder="Taylor Swift"
                            enterButton="Search"
                            onSearch={onSearch}
                            size="large"
                            loading={isLoading}
                            style={{width: '600px'}}
                        />
                        <Select className={'w-24'} size={'large'} options={options}
                                onChange={handleSelectChange}
                                defaultValue={'Artist'}/>
                    </Form>
                    <Avatar
                        style={{
                            ...iconColor,
                            cursor: 'pointer',
                            width: '50px',
                            height: '50px',
                            border: 'none'
                        }}
                        icon={<UserOutlined/>}
                        onClick={avatarClickHandler}
                    />
                </Header>
                <Content
                    style={{
                        margin: '16px',
                        padding: 16,
                        minHeight: 280,
                        background: colorBgContainer,
                        borderRadius: borderRadiusLG,
                    }}
                >
                    <Outlet/>
                </Content>
                <Footer style={{
                    background: colorBgContainer,
                    margin: '16px',
                    padding: '0px 10px',
                    height: '80px',
                    borderRadius: borderRadiusLG,
                }}>
                    <PlayBar/>
                </Footer>
            </Layout>
        </Layout>
    );
};
export default AppContainer;