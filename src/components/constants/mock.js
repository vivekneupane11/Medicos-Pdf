// import { RiArticleFill, RiArticleLine, RiSlideshow3Line, RiSlideshowLine } from 'react-icons/ri';
import SlideIcon from '../global/icons/slide_Icon';
import BookIcon from '../global/icons/book_Icon';
import NewsIcon from '../global/icons/news_Icon';
import HomeIcon from '../global/icons/homeIcon';
import GridIcon from '../global/icons/gird_Icon';
import FacebookIcon from '../global/icons/SocialIcon/facebook';
import InstagramIcon from '../global/icons/SocialIcon/instagram';
import TwitterIcon from '../global/icons/SocialIcon/twitter';

const navLinks = [
  {
    id: 0,
    name:"Home",
    route: "/",
    icon:<HomeIcon className='icon'/>,
  },
  {
    id: 1,
    name: "Slide",
    route: "/slide",
    icon:<SlideIcon className="icon"/>,

  },

  {
    id: 2,
    name: "Book",
    route: "/book",
    icon:<BookIcon className="icon"/>,
  },
  {
    id: 3,
    name: "Journal",
    route: "/journal",
    icon:<NewsIcon className="icon"/>,
  },
  {
    id: 4,
    name: "Article",
    route: "/article",
    icon:<BookIcon className="icon"/>,
  },
  {
    id: 5,
    name: "News",
    route: "/news",
    icon:<NewsIcon className="icon"/>,
   
  },
  
 
 ]

const footerBottomContent = [
  "Legal Notice",
  "Terms & conditions",
  "Privacy Policy"
]




const pages = [
  {
    page: 0,
    content: "Medicos PDF"
  },
  {
    page: 1,
    content: "Medicos ECG"
  },
  {
    page: 2,
    content: "Medicos Histology"
  },
  {
    page: 3,
    content: "Medicos Denti"
  },
  {
    page: 4,
    content: "Medicos PDF"
  },
  {
    page: 5,
    content: "Medicos ECG"
  },
  {
    page: 6,
    content: "Medicos Histology"
  },
  {
    page: 7,
    content: "Medicos Denti"
  }
]


const Sub_Catagories =
  ["Anatomy", "Biochemestry", "Histology",
    "Community Medicine", "Embrology", "Genetics"]

const profile = [
  {
    link: 'My Profile',
    url: '/profile',
  },
  {
    link: 'Preferences',
    url: '/preference',
  }, 
  {

    link: 'Log Out',
    url: '#logout',
  },
]

const exploreLinks = [
  {
    id: 1,
    linkName: 'All',
    url: './books',
  },
  {
    id: 2,
    linkName: 'Basic Science',
    url: './science',
  },
  {
    id: 3,
    linkName: 'Clinical Science',
    url: './clinical',
  },
  {
    id: 4,
    linkName: 'Dental',
    url: './dental',
  },
  {
    id: 5,
    linkName: 'Nursing',
    url: './nursing',
  },
]

 const newsDetailFollowUsDetails=[
  {
    id:1,
    socialmedianame:'Facebook',
    socialmedialink:'https://www.facebook.com/Medicos.int7',
    likes:'63k',
    logo:<FacebookIcon className="newsDetailFollowUs-container-cards-card-link-icon" />,
    bgColor:'#4267b2',
  },
 
  {
    id:3,
    socialmedianame:'Instagram',
    socialmedialink:'https://www.instagram.com/medicos.international/',
    likes:'12.2k',
    logo:<InstagramIcon className="newsDetailFollowUs-container-cards-card-link-icon" />,
    bgColor:'#369',
  },
  {
    id:2,
    socialmedianame:'Twitter',
    socialmedialink:'https://twitter.com/medicosint7',
    likes:'',
    logo:<TwitterIcon className="newsDetailFollowUs-container-cards-card-link-icon" />,
    bgColor:'#1da1f2',
  },

]


export const footerDetails={
  footerTopDetails:[
    {
      // icon:RiSlideshowLine,
      icon:<SlideIcon className='footer-Container-top-card-link-icon' />,
      title:'Slides',
      link:'/slide',
      count:'50,000+'

    },
    {
      icon:<BookIcon className='footer-Container-top-card-link-icon' />,
      title:'Books',
      link:'/book',
      count:'5,000+' 

    },
    {
      // icon:BiCategoryAlt,
      icon:<GridIcon className='footer-Container-top-card-link-icon' />,
      title:'Category',
      link:'/slidesubcategory/Basic Science/Anatomy',
      count:'Select',

    },
    {
      // icon:RiArticleFill,
      icon:<BookIcon className='footer-Container-top-card-link-icon' />,
      title:'Articles',
      link:'/article',
      count:'Medical',

    },
    {
      icon:<NewsIcon className='footer-Container-top-card-link-icon' />,
      title:'Journals',
      link:'/journal',
      count:'Latest',

    },

    // {
    //   icon:BsJournals,
    //   title:'journal',
    //   link:'/journal',
    //   count:'Top',

    // },
  
  ],
  footerMidDetails:[
    {
      heading:'Product',
      links:[
        {
          linkName:'Medicos pdf',
          url:'https://play.google.com/store/apps/details?id=com.rjl.bookapp'
        },
        {
          linkName:'Medicos Ecg',
          url:'https://ecgmedi.page.link/play-store-update-from-app'
        },
        {
          linkName:'Medicos histology',
          url:'https://histo.page.link/apP'
        },
        {
          linkName:'Medicos MCQ',
          url:'https://medicosmcq.page.link/App'
        },
        {
          linkName:'Medicos radiology',
          url:'https://mradio.page.link/app'
        },
        {
          linkName:'Medicos surgery',
          url:'https://medicossurgery.page.link/app'
        },
        {
          linkName:'Medicos Medicine',
          url:'https://medicosmedicine.page.link/APp'
        },

      ]
    },
   
    {
      heading:'Explore',
      links:[
        {
          linkName:'books',
          url:'/book'
        },
        {
          linkName:'slide',
          url:'/slide'
        },
        {
          linkName:'news',
          url:'/news'
        },
        {
          linkName:'articles',
          url:'/article'
        },
        {
          linkName:'journal',
          url:'/journal'
        },
      ]
    },
    {
      heading:'Company',
      links:[
        {
          linkName:'about us',
          url:'/aboutus'
        },
        {
          linkName:'Team',
          url:'https://medicos.com.np/team-2/'
        },
        {
          linkName:'Contact us',
          url:'https://medicos.com.np/contact/'
        },
        {
          linkName:'terms and Conditions',
          url:'/termsandconditions'
        },
        {
          linkName:'Privacy policy',
          url:'/privacypolicy'
        },
      ]
    },
    {
      heading:'Resources',
      links:[
        {
          linkName:'Health Patro',
          url:'https://healthpatro.com/'
        },
        {
          linkName:'Medical Blog',
          url:'https://medicoss.org/'
        },
        
      ]
    },
  ],
  footerBottomDetails:[
    {
      title:'Terms and Conditions',
      link:'/termsandconditions',
    },
    {
      title:'Privacy Policy',
      link:'/privacypolicy',
    },
  ]
}

const notesLists=[
  {
    name:'Infectious diseases'
  },
  {
    name:'Respiratory Medicine'
  },{
    name:'Urology'
  },{
    name:'Nephrology'
  },
  {
    name:'Gynaecology'
  },
  {
    name:'Cardiology'
  },
  {
    name:'Dermatology'
  },
  {
    name:'Nurology'
  },
 
]
const ProfileNav =
  ["uploads", "playlists", "liked",
    "followers","clipboard"]


const newsLastWholeSectionDetails={ 
      col2subscribeAndfollow:[
        {
          id:1,
          socialmedianame:'Facebook',
          socialmedialink:'https://www.facebook.com/Medicos.int7',
          likes:'63k',
          logo:<FacebookIcon className="newsLastWholeSection-container-right-subscribeAndFollowContainer-cardsContainer-card-link-icon" />,
          bgColor:'#4267b2',
        },
        {
          id:3,
          socialmedianame:'Instagram',
          socialmedialink:'https://www.instagram.com/medicos.international/',
          likes:'12.2k',
          logo:<InstagramIcon className="newsLastWholeSection-container-right-subscribeAndFollowContainer-cardsContainer-card-link-icon" />,
          bgColor:'#369',
        },
        {
          id:2,
          socialmedianame:'Twitter',
          socialmedialink:'https://twitter.com/medicosint7',
          likes:'',
          logo:<TwitterIcon className="newsLastWholeSection-container-right-subscribeAndFollowContainer-cardsContainer-card-link-icon" />,
          bgColor:'#1da1f2',
        },
     
      ]
    }
  
export {
  newsLastWholeSectionDetails,
  ProfileNav,
  profile,
  notesLists,
  newsDetailFollowUsDetails,
  navLinks,
  footerBottomContent,
  Sub_Catagories,
  pages,
  exploreLinks
};




