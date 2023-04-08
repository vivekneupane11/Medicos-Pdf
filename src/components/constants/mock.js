import { faFacebookF, faInstagram, faLinkedinIn, faMediumM, faPinterest, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faArrowLeft, faArrowRight, faBolt } from '@fortawesome/free-solid-svg-icons';
import { AiFillHeart } from "react-icons/ai";
import { BiGlasses } from "react-icons/bi";
import { FiDownload, FiSlack } from "react-icons/fi";
import NewsPlayBtn from "../global/newsPlayBtn";
import NewsRating from "../newsRating";
const navLinks = [
  {
    id: 0,
    name:"Home",
    route: "/",
    // icon: <AiOutlineHome className="icon" />
  },
  {
    id: 1,
    name: "Book",
    route: "/book",
    // icon: <FiBook className="icon" />,
    nested: [
      {
        id: 0,
        name: "Books 1",
        route: "/book",
        // icon: <FiBook className="icon" />,
      },
      {
        id: 1,
        name: "Books 2",
        route: "/book",
        // icon: <FiBook className="icon" />,
      }
    ]
  },
  {
    id: 2,
    name: "Article",
    route: "/article",
    // icon: <RiArticleLine className="icon" />
  },
  {
    id: 3,
    name: "News",
    route: "/news",
   

  },
  {
    id: 4,
    name: "Journal",
    route: "/journal",
    // icon: <RiArticleLine className="icon" />
  },

  {
    id: 5,
    name: "Slide",
    route: "/slide",
    // icon: <RiSlideshow2Line className="icon" />

  },
  
  // {
  //   id: 7,
  //   name: "Login",
  //   route: "signUp",
  //   // icon: <IoIosLogIn className="icon" />

  // },
  // {
  //   id: 8,
  //   name: "Components",
  //   route: "/component",
  //   // icon: <CgComponents className="icon" />

  // }
  // ,{
  //   id: 9,
  //   name: "Profile",
  //   route: "/profile",
  //   // icon: <CgComponents className="icon" />

  // }
]

const sliderSlides = [
  {
    image: require("../../assets/images/slide/slide1.png")
  },
  {
    image: require("../../assets/images/slide/slide2.png")
  },
  {
    image: require("../../assets/images/slide/slide3.png")
  },
  {
    image: require("../../assets/images/slide/slide4.png")
  },
  {
    image: require("../../assets/images/slide/slide5.png")
  }
]

const footerBottomContent = [
  "Legal Notice",
  "Terms & conditions",
  "Privacy Policy"

]

const appList = [
  // "Medicos PDF",
  // "Medicos ECG",
  // "Medicos Histology",
  // "Medicos Denti"
  // {
  //   id:1,
  //   icon: require('../../assets/images/appIcon/1024.png'),

  // },
  {
    id:2,
    icon: require('../../assets/images/appIcon/pdf.png'),

  },
  {
    id:3,
    icon: require('../../assets/images/appIcon/dm_logo.jpg'),

  },
  {
    id:4,
    icon: require('../../assets/images/appIcon/ECG.png'),

  },
  
  {
    id:5,
    icon: require('../../assets/images/appIcon/medicos_mcq.png'),

  }
  ,
  {
    id:6,
    icon: require('../../assets/images/appIcon/abb_icon.png'),

  },
  {
    id:7,
    icon: require('../../assets/images/appIcon/pedia_logo.jpg'),

  },
  {
    id:8,
    icon: require('../../assets/images/appIcon/radio_logo.jpg'),

  },
  {
    id:9,
    icon: require('../../assets/images/appIcon/surgery_logo.jpg'),

  },
  {
    id:10,
    icon: require('../../assets/images/appIcon/medicine_logo.jpg'),

  },


]

const radioOptions = [
  {
    option: "Checked"
  },
  {
    option: "Unchecked"
  }
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

const tabs = [
  {
    label: "Home",
    content: "Home Page Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa quisque faucibus porta convallis in. Varius est urna, faucibus et, diam senectus aenean morbi. Quam leo id morbi sem convallis ut fermentum, praesent. Neque, eleifend mattis felis, viverra."
  },
  {
    label: "Profile",
    content: "Profile Page Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa quisque faucibus porta convallis in. Varius est urna, faucibus et, diam senectus aenean morbi. Quam leo id morbi sem convallis ut fermentum, praesent. Neque, eleifend mattis felis, viverra."
  },
  {
    label: "Messages",
    content: "Messages Page Lorem ipsum dolor sit amet, consectetur adipiscing elit. Massa quisque faucibus porta convallis in. Varius est urna, faucibus et, diam senectus aenean morbi. Quam leo id morbi sem convallis ut fermentum, praesent. Neque, eleifend mattis felis, viverra."
  }
]

const comments = [
  {
    id: 0,
    userDisplayName: "Michael Lewis",
    userImage: require("../../assets/images/Profile Pic.png"),
    comment: "You have the opportunity to play this game of life you need to appreciate every moment. A lot of people don’t appreciate the moment until it’s passed.",
    likes: 10,
    shares: 5
  },
  {
    id: 1,
    userDisplayName: "Jessica Stones",
    userImage: require("../../assets/images/Profile Pic.png"),
    comment: "I always felt like I could do anything. That’s the main thing people are controlled by! Thoughts- their perception of themselves! They're slowed down.",
    likes: 30,
    shares: 15
  }
]
const reviews = [
  {
    id: 0,
    userDisplayName: "Michael Lewis",
    profilePic: require("../../assets/images/Profile Pic.png"),
    review: "You have the opportunity to play this game of life you need to appreciate every moment. A lot of people don’t appreciate the moment until it’s passed.",
    likes: 10,
    shares: 5,
    time: 1
  },
  {
    id: 1,
    userDisplayName: "Jessica Stones",
    profilePic: require("../../assets/images/Profile Pic.png"),
    review: "I always felt like I could do anything. That’s the main thing people are controlled by! Thoughts- their perception of themselves! They're slowed down.",
    likes: 30,
    shares: 15,
    time: 2
  }
]
const slides = [
  {
    id: 1,
    likes: 50,
    comments: 20,
    time: 1,
    views: 105,
  }
]

const Sub_Catagories =
  ["Anatomy", "Biochemestry", "Histology",
    "Community Medicine", "Embrology", "Genetics"]


const images = {
  imageSettings: require('../../images/settings.png').default,
  imagebackC1: require('../../images/backC1.jpg').default,
  imagebackC2: require('../../images/backC2.jpg').default,
  imagebackC3: require('../../images/backC3.jpg').default,
  imagebookcover1: require('../../images/bookcover2.png').default,
}
const { imageSettings, imagebackC1, imagebackC2, imagebackC3, imagebookcover1 } = images;

const dropdownsingle = [
  {
    image: imageSettings,
    link: 'my profile',
    url: '#myprofile',
  },
  {
    image: imageSettings,
    link: 'settings',
    url: '#settings',
  },
  {
    image: imageSettings,
    link: 'Activity',
    url: 'activity',
  },
  {
    image: imageSettings,
    link: 'Support',
    url: '#support',
  },
  {
    image: imageSettings,
    link: 'logout',
    url: '#logout',
  },
]
const profile = [
  {
    image: imageSettings,
    link: 'My Profile',
    url: '/profile',
  },
  {
    image: imageSettings,
    link: 'Preferences',
    url: '/preference',
  }, 
  {
    image: imageSettings,
    link: 'Log Out',
    url: '#logout',
  },
]

const customizableselectNames = ['ram', 'shyam', 'hari', 'sita', 'gita', 'mita'];

const li1 = [
  {
    li1: 'action',
    link: '#one'
  },
  {
    li1: 'another action',
    link: '#two'
  },
]

const li2h = 'submenu';

const li2 = [
  {
    li1: 'submenu action',
    link: '#one'
  },
  {
    li1: 'submenu action',
    link: '#two'
  },
]

const li3h = 'submenu';

const li3 = [

  {
    li1: 'subsubmenu action1',
    link: '#one'
  },
  {
    li1: 'subsubmenu action2',
    link: '#two'
  },

]

const li4h = 'secondsubmenu';

const li4 = [

  {
    li1: 'subsubmenu action1',
    link: '#one'
  },
  {
    li1: 'subsubmenu action2',
    link: '#two'
  },

]
const exploreProfileTab=[
  {
    id: 1,
    linkName: 'Slides',
    url: './slide',
  },
  {
    id: 2,
    linkName: 'BookMarks',
    url: './booked',
  },
  {
    id: 3,
    linkName: 'Clipboard',
    url: './cliped',
  },
  {
    id: 4,
    linkName: 'Following',
    url: './following',
  },
  {
    id: 5,
    linkName: 'About Me',
    url: './aboutme',
  },
]
const exploreLinks = [
  {
    id: 1,
    linkName: 'All Books',
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

const relatedBooksSliderDetails = [
  {
    id: 1,
    img: require('../../images/bookcover.png').default,
    title: 'Anatomy Recall(Recall series)',
    author: 'Manoj Khatri(author)',
    rating: '4',
  },
  {
    id: 2,
    img: require('../../images/bookcover2.png').default,
    title: 'Anatomy Recall(Recall series)',
    author: 'Manoj Khatri(author)',
    rating: '4',
  },
  {
    id: 3,
    img: require('../../images/bookcover3.png').default,
    title: 'Anatomy Recall(Recall series)',
    author: 'Manoj Khatri(author)',
    rating: '4',
  },
]

const ExploreMoreSliderDetails = [
  {
    id: 1,
    img: require('../../images/bookcover.png').default,
    title: 'Anatomy1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est et sed elit tempus nec dui. Sed varius enim, lobortis vitae, nec turpis tincidunt.',
  },
  {
    id: 2,
    img: require('../../images/bookcover2.png').default,
    title: 'Anatomy1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est et sed elit tempus nec dui. Sed varius enim, lobortis vitae, nec turpis tincidunt.',
  },
  {
    id: 3,
    img: require('../../images/bookcover3.png').default,
    title: 'Anatomy1',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est et sed elit tempus nec dui. Sed varius enim, lobortis vitae, nec turpis tincidunt.',
  },
  {
    id: 4,
    img: require('../../images/bookcover.png').default,
    title: 'Anatomy2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est et sed elit tempus nec dui. Sed varius enim, lobortis vitae, nec turpis tincidunt.',
  },
  {
    id: 5,
    img: require('../../images/bookcover2.png').default,
    title: 'Anatomy2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est et sed elit tempus nec dui. Sed varius enim, lobortis vitae, nec turpis tincidunt.',
  },
  {
    id: 6,
    img: require('../../images/bookcover3.png').default,
    title: 'Anatomy2',
    description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Est et sed elit tempus nec dui. Sed varius enim, lobortis vitae, nec turpis tincidunt.',
  },
]

const whatClientSays = [
  {
    id: 1,
    clientName: "Sarah Smith",
    quote: "Take up one idea. Make that one idea your life - think of it, dream of it, live on that idea. Let the brain, muscles, nerves, every part of your body, be full of that idea, and just leave every other idea alone. This is the way to success. A single rose can be my garden... a single friend, my world.",
    clientImage: require('./../../images/client2.jpg').default,
    color: '#11cdef',
  },
  {
    id: 2,
    clientName: "Isaac Hunter",
    quote: "Take up one idea. Make that one idea your life - think of it, dream of it, live on that idea. Let the brain, muscles, nerves, every part of your body, be full of that idea, and just leave every other idea alone. This is the way to success. A single rose can be my garden... a single friend, my world.",
    clientImage: require('../../images/client1.jpg').default,
    color: '#f5365c',
  }
]

const joinOurWorldDetails = [
  {
    id: 1,
    clientName: 'Lora jimi',
    clientImage: require('../../images/client3.jpg').default,
    clientQuote: '"The simplest visual description uses ordinary words to convey what the writer sees. First he or she must look at the subject – slowly, carefully, and repeatedly, if possible – to identify the parts that make the whole"',
  },
  {
    id: 2,
    clientName: 'Micheal jenos',
    clientImage: require('../../images/client4.jpg').default,
    clientQuote: '"Artist is a term applied to a person who engages in an activity deemed to be an art. An artist also may be defined unofficially as "a person who expresses him- or herself through a medium". He is a descriptive term applied to a person who engages in an activity deemed to be an art."',
  },
  {
    id: 3,
    clientName: 'Andrew lino',
    clientImage: require('../../images/client5.jpg').default,
    clientQuote: '"The simplest visual description uses ordinary words to convey what the writer sees. First he or she must look at the subject – slowly, carefully, and repeatedly, if possible – to identify the parts that make the whole"',
  },
  {
    id: 4,
    clientName: 'Mike ranson',
    clientImage: require('../../images/client6.jpg').default,
    clientQuote: '"Artist is a term applied to a person who engages in an activity deemed to be an art. An artist also may be defined unofficially as "a person who expresses him- or herself through a medium". He is a descriptive term applied to a person who engages in an activity deemed to be an art."',
  },
  {
    id: 5,
    clientName: 'Rose arthur',
    clientImage: require('../../images/client7.jpg').default,
    clientQuote: '"The simplest visual description uses ordinary words to convey what the writer sees. First he or she must look at the subject – slowly, carefully, and repeatedly, if possible – to identify the parts that make the whole"',
  },

]

const awesomeProduct = 
  {
    Icon: <AiFillHeart style={{ color: `$--primary` }} />,
    //iconImageColor:,
    productTitle: "Slack Bot",
    productDetails: `If everything I did failed - which it doesn't, 
    it actually succeeds - just the fact that I'm willing to fail is an inspiration.
     People are so scared to lose that they don't even try.`,
    bottomIcon: <BiGlasses style={{ color: `$--primary` }} />,
    bottomLabel: "CHECK MORE",
    bottomButtontype: "primary-link",
  }


// const homeAwesomeProductDetails = [
//   {
//     id: 1,
//     Icon: <AiFillHeart style={{ color: `$--primary` }} />,
//     //iconImageColor:,
//     productTitle: "Slack Bot",
//     productDetails: `If everything I did failed - which it doesn't, 
//     it actually succeeds - just the fact that I'm willing to fail is an inspiration.
//      People are so scared to lose that they don't even try.`,
//     bottomIcon: <BiGlasses style={{ color: `$--primary` }} />,
//     bottomLabel: "CHECK MORE",
//     bottomButtontype: "primary-link",
//   },
  // {
  //   id: 2,
  //   Icon: <ImBooks style={{ color: `#1aae6f` }} />,
  //   productTitle: "Slack Bot",
  //   productDetails: `If everything I did failed - which it doesn't, 
  //   it actually succeeds - just the fact that I'm willing to fail is an inspiration.
  //    People are so scared to lose that they don't even try.`,
  //   bottomLabel: "FIND A OPPURTUNITY",
  //   bottomIcon: <FiKey style={{ color: `#1aae6f` }} />,
  //   bottomButtontype: "success-link",
  // },
  // {
  //   id: 3,
  //   Icon: <AiFillTrophy style={{ color: `#ff3709` }} />,
  //   productTitle: "Slack Bot",
  //   productDetails: `If everything I did failed - which it doesn't, 
  //   it actually succeeds - just the fact that I'm willing to fail is an inspiration.
  //    People are so scared to lose that they don't even try.`,
  //   bottomLabel: "CHECK MORE",
  //   bottomIcon: <ImBullhorn style={{ color: `#ff3709` }} />,
  //   bottomButtontype: "warning-link",
  // },
  // {
  //   id: 4,
  //   Icon: <AiFillHeart style={{ color: `$--primary` }} />,
  //   //iconImageColor:,
  //   productTitle: "Slack Bot",
  //   productDetails: `If everything I did failed - which it doesn't, 
  //   it actually succeeds - just the fact that I'm willing to fail is an inspiration.
  //    People are so scared to lose that they don't even try.`,
  //   bottomIcon: <BiGlasses style={{ color: `$--primary` }} />,
  //   bottomLabel: "CHECK MORE",
  //   bottomButtontype: "primary-link",
  // },
  // {
  //   id: 5,
  //   Icon: <ImBooks style={{ color: `#1aae6f` }} />,
  //   productTitle: "Slack Bot",
  //   productDetails: `If everything I did failed - which it doesn't, 
  //   it actually succeeds - just the fact that I'm willing to fail is an inspiration.
  //    People are so scared to lose that they don't even try.`,
  //   bottomLabel: "FIND A OPPURTUNITY",
  //   bottomIcon: <FiKey style={{ color: `#1aae6f` }} />,
  //   bottomButtontype: "success-link",
  // },
// ]

const awesomeProject = [
  {
    id: 1,
    col1_icon: <FiSlack style={{ color: `#1aae6f` }} />,
    col1_tag: "J1-05",
    projectHeading: "SLACK",
    mainImage: <FiSlack style={{ color: `#1aae6f` }} />,
    projectDetails: `If everything I did failed - which it doesn't, 
    it actually succeeds `,
    image1: require("../../assets/images/profile2.png")?.default,
    image2: require("../../assets/images/profile2.png")?.default,
    image3: require("../../assets/images/profile2.png")?.default,

  },
  {
    id: 2,
    col1_icon: <FiSlack style={{ color: `#1aae6f` }} />,
    col1_tag: "J1-05",
    projectHeading: "SLACK",
    mainImage: <FiSlack style={{ color: `#1aae6f` }} />,
    projectDetails: `If everything I did failed - which it doesn't, 
    it actually succeeds `,
    image1: require("../../assets/images/profile2.png")?.default,
    image2: require("../../assets/images/profile2.png")?.default,
    image3: require("../../assets/images/profile2.png")?.default,

  },
  {
    id: 3,
    col1_icon: <FiSlack style={{ color: `#1aae6f` }} />,
    col1_tag: "J1-05",
    projectHeading: "SLACK",
    mainImage: <FiSlack style={{ color: `#1aae6f` }} />,
    projectDetails: `If everything I did failed - which it doesn't, 
    it actually succeeds `,
    image1: require("../../assets/images/profile2.png")?.default,
    image2: require("../../assets/images/profile2.png")?.default,
    image3: require("../../assets/images/profile2.png")?.default,

  }

]
const invoices =[{
  id: 1,
  customerName: "Cm Pandey",
  customerDistrict: "Nawalpur",
  customerCity: "Kawasoti-16",
  customerTole: "Danda",
  invoiceNO: "#906443",
  invoiceDate: "2021/06/11",
  dueDate: "2021/06/20",
 
 
},

]
const cart=[{
  productName: "hello",
  quantity: "3",
  rate: "100",
  amount: "300",
},
{
  productName: "hello",
  quantity: "3",
  rate: "100",
  amount: "300",
}
]

const relatedStories = [
  {
    id: 1,
    featurePhoto: require("../../assets/images/members.jpg"),
    title: "MateLabs mixes learning with IFTTT",
    content: `If you’ve ever wanted to train a machine learning model and
     integrate it with IFTTT, you now can with a new offering from MateLabs.
     MateVerse, a platform where novices can spin out machine akasdn alasd leidlj as elds da...`,
    authorName: "CM pandey",
    authorImage: require("../../images/client1.jpg"),
    UploadDate: "12 june 2021 ",

  },
  {
    id: 2,
    featurePhoto: require("../../assets/images/members.jpg"),
    title: "MateLabs mixes learning with IFTTT",
    content: `If you’ve ever wanted to train a machine learning model and
     integrate it with IFTTT, you now can with a new offering from MateLabs.
     MateVerse, a platform where novices can spin out machine akasdn alasd leidlj as elds da...`,
    authorName: "CM pandey",
    authorImage: require("../../images/client1.jpg"),
    UploadDate: "12 june 2021 ",

  }

]
const topContent = [
  {
    id: 1,
    date: "1 june",
    title1: "hello world i m here",
    paragraph1: `This is the paragraph where you can write 
    more details about your product. Keep you user engaged by providing meaningful information. Remember that by this time, the user is curious, otherwise he wouldn't scroll to get here.
     Add a button if you want the user to see more. We are here to make life better.`,
    paragraph2: `This is the paragraph where you can write more details about your
      product. Keep you user engaged by providing meaningful information. Remember 
      that by this time, the user is curious, otherwise he wouldn't scroll to get here. 
     Add a button if you want the user to see more. We are here to make life better.`,
    quote: `Remember 
     that by this time, the user is curious, otherwise he wouldn't scroll to get here.`,
    authorName: "Cm Pandey",
    title2: "Remember the name ",
    title2_Paragraph: `Remember that by this time, the user is curious, otherwise he wouldn't scroll to get here.Remember 
    that by this time, the user is curious, otherwise he wouldn't scroll to get here.`,

  },
]
 
const newsCarousalData=[
  {
    id:0,
    backgroundImage:require('../../images/newscover2.jpg').default,
    heading:'If you were to start a Busineess from scratch Tomorrow',
    dateAndTime:{author:'InHype',authorColor:'#fff',date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#fff' ,fontSize:'12px'},

     tags:[
      { id:0 ,
        tag: {color:'orange', tag:'lifestyle',link:'/#456',},
      },
      { id:1 ,
        tag: {color:'orange', tag:'lifestyle',link:'/#456',},
      },
    ]
   
   
  },
  {
    id:1,
    backgroundImage:require('../../images/newscover3.jpg').default,
    heading:'Supporting the People Behind the Product',
    dateAndTime:{author:'InHype',authorColor:'#fff',date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#fff' ,fontSize:'12px'},

    tags:[
     { id:0 ,
       tag: {color:'orange', tag:'lifestyle',link:'/#456',},
     },
   ]
  },
  {
    id:2,
    backgroundImage:require('../../images/newscover1.jpg').default,
    heading:'Apple expands and Updates its "Everyone can code" program',
    dateAndTime:{author:'InHype',authorColor:'#fff',date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#fff' ,fontSize:'12px'},

     tags:[
      { id:0 ,
        tag: {color:'orange', tag:'lifestyle',link:'/#456',},
      },
    ]
  }
]
const accordion=[
  {
    id:1,
    heading:"About Medicos pdf web",
    paragraphs:`Medicos pdf web provides you all neccessary resouces and materials in form
               of slides and pdf for medical aspirants for their studies.Medicos pdf web provides you all neccessary resouces and materials in form
               of slides and pdf for medical aspirants for their studies.Medicos pdf web provides you all neccessary resouces and materials in form
               of slides and pdf for medical aspirants for their studies`,
  },
  {
    id:2,
    heading:"What are the advantages of SignIn ?",
    paragraphs:`Medicos pdf web provides you all neccessary resouces and materials in form
    of slides and pdf for medical aspirants for their studies.Medicos pdf web provides you all neccessary resouces and materials in form
    of slides and pdf for medical aspirants for their studies.Medicos pdf web provides you all neccessary resouces and materials in form
    of slides and pdf for medical aspirants for their studiesUsers that have signed up to medical pdf are able to download and upload the 
                  pdf and slides so that it may access it anytime and for others conviniet as well.`,
  },
  {
    id:3,
    heading:"Remember that by this time, the user is curious?",
    paragraphs:`Medicos pdf web provides you all neccessary resouces and materials in form
    of slides and pdf for medical aspirants for their studies.Medicos pdf web provides you all neccessary resouces and materials in form
    of slides and pdf for medical aspirants for their studies.Medicos pdf web provides you all neccessary resouces and materials in form
    of slides and pdf for medical aspirants for their studiesRemember that by this time, the user is curious, otherwise he wouldn't scroll to get here.Remember that by this time,
     the user is curious, otherwise he wouldn't scroll to get here.`,
  },
  {
    id:4,
    heading:"Remember that by this time, the user is curious?",
    paragraphs:`Medicos pdf web provides you all neccessary resouces and materials in form
    of slides and pdf for medical aspirants for their studies.Medicos pdf web provides you all neccessary resouces and materials in form
    of slides and pdf for medical aspirants for their studies.Medicos pdf web provides you all neccessary resouces and materials in form
    of slides and pdf for medical aspirants for their studiesRemember that by this time, the user is curious, otherwise he wouldn't scroll to get here.Remember that by this time,
     the user is curious, otherwise he wouldn't scroll to get here.`,
  }
]

const newsLinksDetails=[
  {
    id:1,
    tag:[{id:1,color:'purple', tag:'business',link:'/#456',}],
    heading:'How fashion startups get accepted into tech accelerators',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:2,
    tag:[{id:1,color:'#2568ef', tag:'travel',link:'/#456',}],
    heading:'12 ways to travel more sustainably that you haven"t thought of yet',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:3,
    tag:[{id:1,color:'blue', tag:'video',link:'/#456',}],
    heading:'A Place Where Technology Meets Craftsmanship',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read' ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:4,
    tag:[
      {id:1,color:'orange', tag:'lifestyle',link:'/#456',},
      {id:2,color:'#2568ef', tag:'markets',link:'/#456',}
  ],
    heading:'Five Things You Need to Know to Start Your Day',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
]
 

const newsRecentDetailsLeft=
  {
    bgImage:require('../../images/recent1.jpg').default,
    tag:{color:'purple', tag:'business',link:'/#456',},
    leftheading:'How fashion startups get accepted into tech accelerators',
    leftheadinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#fff' ,fontSize:'12px'},
    leftpara:'Graduating from a top accelerator or incubator can be as career-defining for a startup founder as an elite university diploma. The intensive programmes, which…',
  }
const slideRecentLeft=
{
  bgImage:require('../../images/recent1.jpg').default,
  tag:{color:'purple', tag:'business',link:'/#456',},
  leftheading:'How fashion startups get accepted into tech accelerators',
  leftheadinglink:'/head',
  dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#fff' ,fontSize:'12px'},
  leftpara:'Graduating from a top accelerator or incubator can be as career-defining for a startup founder as an elite university diploma. The intensive programmes, which…',
}
  const journalRecent=[
    {
      id:1,
      heading:'12 ways to travel more sustainably that you haven"t thought of yet',
      link:'/head',
      dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    },
    {
      id:2,
      heading:'12 ways to travel more sustainably that you haven"t thought of yet',
      link:'/head',
      dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    },
    {
      id:3,
      heading:'12 ways to travel more sustainably that you haven"t thought of yet',
      link:'/head',
      dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    },
    {
      id:4,
      heading:'12 ways to travel more sustainably that you haven"t thought of yet',
      link:'/head',
      dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    },

  ]
  const slideRecentRight=[
    {
      id:1,
      righthead:'12 ways to travel more sustainably that you haven"t thought of yet',
      link:'/head',
      dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    },
    {
      id:2,
      link:'/head',
      righthead:'A Place Where Technology Meets Craftsmanship',
      dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    },
    {
      id:3,
      link:'/head',
      righthead:'If You Were to Start a Business From Scratch Tomorrow',
      dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    },
    {
      id:4,
      link:'/head',
      righthead:'12 ways to travel more sustainably that you haven"t thought of yet',
      dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    },
    {
      id:5,
      link:'/head',
      righthead:'Talisker Bay on the Isle of Skye in Scotland',
      dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    },
  ]

const newsRecentDetailsRight=[
  {
    id:1,
    righthead:'12 ways to travel more sustainably that you haven"t thought of yet',
    link:'/head',
    dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:2,
    link:'/head',
    righthead:'A Place Where Technology Meets Craftsmanship',
    dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:3,
    link:'/head',
    righthead:'If You Were to Start a Business From Scratch Tomorrow',
    dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:4,
    link:'/head',
    righthead:'12 ways to travel more sustainably that you haven"t thought of yet',
    dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:5,
    link:'/head',
    righthead:'Talisker Bay on the Isle of Skye in Scotland',
    dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
]

const woldwideright=[
  {
    id:1,
    righthead:'12 ways to travel more sustainably that you haven"t thought of yet',
    link:'/head',
    dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:2,
    link:'/head',
    righthead:'A Place Where Technology Meets Craftsmanship',
    dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:3,
    link:'/head',
    righthead:'If You Were to Start a Business From Scratch Tomorrow',
    dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:4,
    link:'/head',
    righthead:'12 ways to travel more sustainably that you haven"t thought of yet',
    dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:5,
    link:'/head',
    righthead:'Talisker Bay on the Isle of Skye in Scotland',
    dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
]

const newsTechnologyDetails=[
  {
    bgImage:require('../../images/tech1.jpg').default,
    id:1,
    rating:<NewsRating bgColor="#4545e8" rating='8.5'/>,
    tag:[
      {id:1,color:'orange', tag:'lifestyle',link:'/#456',},
      {id:2,color:'#2568ef', tag:'markets',link:'/#456',}
    ],
    heading:'Five Things You Need to Know to Start Your Day',
    headinglink:'/head',
    dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    para:'From there, we generally start working on visual concepts that can make that vision more tangible. Our stakeholders are often editors with…',
  },
  {
    bgImage:require('../../images/tech2.jpg').default,
    id:2,
    tag:[
      {id:1,color:'orange', tag:'lifestyle',link:'/#456',},
    ],
    heading:'Five Things You Need to Know to Start Your Day',
    headinglink:'/head',
    dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    para:'From there, we generally start working on visual concepts that can make that vision more tangible. Our stakeholders are often editors with…',
  },
  {
    bgImage:require('../../images/tech3.jpg').default,
    id:3,
    rating:<NewsRating bgColor="#6641DB" rating='8.5'/>,
    tag:[
      {id:1,color:'orange', tag:'lifestyle',link:'/#456',},
    ],
    heading:'Five Things You Need to Know to Start Your Day',
    headinglink:'/head',
    dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    para:'From there, we generally start working on visual concepts that can make that vision more tangible. Our stakeholders are often editors with…',
  },
  {
    bgImage:require('../../images/tech1.jpg').default,
    id:4,
    tag:[
      {id:1,color:'orange', tag:'lifestyle',link:'/#456',},
    ],
    heading:'Five Things You Need to Know to Start Your Day',
    headinglink:'/head',
    dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    para:'From there, we generally start working on visual concepts that can make that vision more tangible. Our stakeholders are often editors with…',
  },
  {
    bgImage:require('../../images/tech2.jpg').default,
    id:5,
    tag:[
      {id:1,color:'orange', tag:'lifestyle',link:'/#456',},
    ],
    heading:'Five Things You Need to Know to Start Your Day',
    headinglink:'/head',
    dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    para:'From there, we generally start working on visual concepts that can make that vision more tangible. Our stakeholders are often editors with…',
  },
  {
    bgImage:require('../../images/tech3.jpg').default,
    id:6,
    tag:[
      {id:1,color:'orange', tag:'lifestyle',link:'/#456',},
    ],
    heading:'Five Things You Need to Know to Start Your Day',
    headinglink:'/head',
    dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    para:'From there, we generally start working on visual concepts that can make that vision more tangible. Our stakeholders are often editors with…',
  }
]

const newsTodayHighlightsDetails=[
  {
     id:1,
     bgImage:require('../../images/todayh1.jpg').default,
     tag: {color:'orange', tag:'lifestyle',link:'/#456',},
     heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
     headinglink:'/head',
     dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:2,
    bgImage:require('../../images/todayh2.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
 },
 {
  id:3,
  bgImage:require('../../images/todayh3.jpg').default,
  tag: {color:'orange', tag:'lifestyle',link:'/#456',},
  heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
  headinglink:'/head',
  dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
},
{
  id:4,
  bgImage:require('../../images/todayh1.jpg').default,
  tag: {color:'orange', tag:'lifestyle',link:'/#456',},
  heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
  headinglink:'/head',
  dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
},
{
  id:5,
  bgImage:require('../../images/todayh2.jpg').default,
  tag: {color:'orange', tag:'lifestyle',link:'/#456',},
  heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
  headinglink:'/head',
  dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
},
{
  id:6,
  bgImage:require('../../images/todayh3.jpg').default,
  tag: {color:'orange', tag:'lifestyle',link:'/#456',},
  heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
  headinglink:'/head',
  dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
},
]
const ourTeam=[
  {
    id:1,
    memberImage:require('../../assets/images/members.jpg'),
    memberImage2:require('../../assets/images/member1.jpg'),
    memberName:"Cm Pandey",
    position:"intern trainee ",
  },
  {
    id:2,
    memberImage:require('../../assets/images/members.jpg'),
    memberImage2:require('../../assets/images/member1.jpg'),
    memberName:"Cm Pandey",
    position:"intern trainee ",
  },
  {
    id:3,
    memberImage:require('../../assets/images/members.jpg'),
    memberImage2:require('../../assets/images/member1.jpg'),
    memberName:"Cm Pandey",
    position:"intern trainee ",
  },
  {
    id:4,
    memberImage:require('../../assets/images/members.jpg'),
    memberImage2:require('../../assets/images/member1.jpg'),
    memberName:"Cm Pandey",
    position:"intern trainee ",
  },
  {
    id:5,
    memberImage:require('../../assets/images/members.jpg'),
    memberImage2:require('../../assets/images/member1.jpg'),
    memberName:"Cm Pandey",
    position:"intern trainee ",
  },
  {
    id:6,
    memberImage:require('../../assets/images/members.jpg'),
    memberImage2:require('../../assets/images/member1.jpg'),
    memberName:"Cm Pandey",
    position:"intern trainee ",
  },

]
const terms=[
  {
    id:1,
    terms:`Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Enim, ante magna pulvinar sem molestie aliquam non.`,
  },
  {
    id:2,
    terms:`Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Enim, ante magna pulvinar sem molestie aliquam non.`,
  }, {
    id:3,
    terms:`Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
    Enim, ante magna pulvinar sem molestie aliquam non.`,
  }

]
 const europeanNews=[
  {
    id:1,
    bgImage:require('../../assets/images/popup.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:2,
    bgImage:require('../../assets/images/popup.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:3,
    bgImage:require('../../assets/images/popup.jpg').default,
    newsPlay:<NewsPlayBtn />,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:4,
    bgImage:require('../../assets/images/popup.jpg').default,
    rating:<NewsRating bgColor="#4545e8" rating='8.5'/>,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:5,
    bgImage:require('../../assets/images/popup.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:6,
    bgImage:require('../../assets/images/popup.jpg').default,
    newsPlay:<NewsPlayBtn />,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:7,
    bgImage:require('../../assets/images/popup.jpg').default,
    rating:<NewsRating bgColor="#4545e8" rating='8.5'/>,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:8,
    bgImage:require('../../assets/images/popup.jpg').default,
    rating:<NewsRating bgColor="#4545e8" rating='8.5'/>,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:9,
    bgImage:require('../../assets/images/popup.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:10,
    bgImage:require('../../assets/images/popup.jpg').default,
    rating:<NewsRating bgColor="#4545e8" rating='8.5'/>,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
 ]

 const trending=[
  {
    id:1,
    bgImage:require('../../assets/images/popup.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:2,
    bgImage:require('../../assets/images/popup.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:3,
    bgImage:require('../../assets/images/popup.jpg').default,
    newsPlay:<NewsPlayBtn />,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:4,
    bgImage:require('../../assets/images/popup.jpg').default,
    rating:<NewsRating bgColor="#4545e8" rating='8.5'/>,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:5,
    bgImage:require('../../assets/images/popup.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:6,
    bgImage:require('../../assets/images/popup.jpg').default,
    newsPlay:<NewsPlayBtn />,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:7,
    bgImage:require('../../assets/images/popup.jpg').default,
    rating:<NewsRating bgColor="#4545e8" rating='8.5'/>,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:8,
    bgImage:require('../../assets/images/popup.jpg').default,
    rating:<NewsRating bgColor="#4545e8" rating='8.5'/>,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:9,
    bgImage:require('../../assets/images/popup.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:10,
    bgImage:require('../../assets/images/popup.jpg').default,
    rating:<NewsRating bgColor="#4545e8" rating='8.5'/>,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
 ]

const newsArtAndCultureDetails=[
  {
    id:1,
    bgImg:require('../../images/art1.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Elon Musk Says Cybertruck Orders Have Climbed to 200,000',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#fff' ,fontSize:'12px'},
  },
  {
    id:2,
    bgImg:require('../../images/art2.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Verizon and Snap to Work Together on 5G-Enhanced Social Media',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#fff' ,fontSize:'12px'},
  }
]

const newsSelectedDetailsLeft=
{
  rating:<NewsRating bgColor="#4545e8" rating='8.5'/>,
  bgImg:require('../../images/selected1.jpg').default,
  tag: {color:'orange', tag:'lifestyle',link:'/#456',},
  heading:'Five Things You Need to Know to Start Your Day',
  headinglink:'/head',
  dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
}

const newsSelectedDetailsRight=[
  {
    id:1,
    bgImg:require('../../images/selected2.jpg').default,
    head:'Talisker Bay on the Isle of Skye in Scotland',
    headlink:'/head'
  },
  {
    id:2,
    bgImg:require('../../images/selected3.jpg').default,
    rating:<NewsRating bgColor="#4545e8" rating='8.5'/>,
    head:'Otter Surfboards in Pacific Ocean with friends',
    headlink:'/head'
  },
  {
    id:3,
    bgImg:require('../../images/selected4.jpg').default,
    head:'Wild Swimming, Conscious Living, Adventures That Matter',
    headlink:'/head'
  }
]
const newsTravelDetails=[
  {
    id:1,
    bgImg:require('../../images/travel1.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    head:'12 ways to travel more sustainably that you haven"t thought of yet',
    headlink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#fff' ,fontSize:'12px'},
  },
  {
    id:2,
    bgImg:require('../../images/travel2.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    head:'Talisker Bay on the Isle of Skye in Scotland',
    headlink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#fff' ,fontSize:'12px'},
  },
  {
    id:3,
    bgImg:require('../../images/travel3.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    head:'12 ways to travel more sustainably that you haven"t thought of yet',
    headlink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#fff' ,fontSize:'12px'},
  },
  {
    id:4,
    bgImg:require('../../images/travel1.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    head:'12 ways to travel more sustainably that you haven"t thought of yet',
    headlink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#fff' ,fontSize:'12px'},
  },
  {
    id:5,
    bgImg:require('../../images/travel2.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    head:'12 ways to travel more sustainably that you haven"t thought of yet',
    headlink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#fff' ,fontSize:'12px'},
  },
  {
    id:6,
    bgImg:require('../../images/travel3.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    head:'12 ways to travel more sustainably that you haven"t thought of yet',
    headlink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#fff' ,fontSize:'12px'},
  },
]

const ArticleCategoriesDetails=[
    {
      id:1,
      postsNo:'2000 books',
      bgImg:require('../../images/cate1.jpg').default,
      tag: {color:'#994db1', tag:'Books',link:'/book',},
      btnlink:'/viewpost',
    },
    {
      id:2,
      postsNo:'Medical Articles',
      bgImg:require('../../images/cate2.jpg').default,
      tag: {color:'#2590ed', tag:'Articles',link:'/article',},
      btnlink:'/viewpost',
    },
    {
      id:3,
      postsNo:'interesting news',
      bgImg:require('../../images/cate3.jpg').default,
      tag: {color:'#c74970', tag:'News',link:'/news',},
      btnlink:'/viewpost',
    },
    {
      id:4,
      postsNo:'latest journals',
      bgImg:require('../../images/cate4.jpg').default,
      tag: {color:'#0d30c3', tag:'Journal',link:'/journal',},
      btnlink:'/viewpost',
    },
    {
      id:4,
      postsNo:'50000 slides',
      bgImg:require('../../images/cate1.jpg').default,
      tag: {color:'#0d30c3', tag:'Slides',link:'/slide',},
      btnlink:'/viewpost',
    },
  
]
const journalCategoriesDetails=[
  {
    id:1,
    postsNo:'5 Posts',
    bgImg:require('../../images/cate1.jpg').default,
    tag: {color:'#994db1', tag:'lifestyle',link:'/#456',},
    btnlink:'/viewpost',
  },
  {
    id:2,
    postsNo:'5 Posts',
    bgImg:require('../../images/cate2.jpg').default,
    tag: {color:'#2590ed', tag:'lifestyle',link:'/#456',},
    btnlink:'/viewpost',
  },
  {
    id:3,
    postsNo:'5 Posts',
    bgImg:require('../../images/cate3.jpg').default,
    tag: {color:'#c74970', tag:'lifestyle',link:'/#456',},
    btnlink:'/viewpost',
  },
  {
    id:4,
    postsNo:'5 Posts',
    bgImg:require('../../images/cate4.jpg').default,
    tag: {color:'#0d30c3', tag:'lifestyle',link:'/#456',},
    btnlink:'/viewpost',
  },

]

const newsCategoriesDetails=[
  {
    id:1,
    postsNo:'5 Posts',
    bgImg:require('../../images/cate1.jpg').default,
    tag: {color:'#994db1', tag:'lifestyle',link:'/#456',},
    btnlink:'/viewpost',
  },
  {
    id:2,
    postsNo:'5 Posts',
    bgImg:require('../../images/cate2.jpg').default,
    tag: {color:'#2590ed', tag:'lifestyle',link:'/#456',},
    btnlink:'/viewpost',
  },
  {
    id:3,
    postsNo:'5 Posts',
    bgImg:require('../../images/cate3.jpg').default,
    tag: {color:'#c74970', tag:'lifestyle',link:'/#456',},
    btnlink:'/viewpost',
  },
  {
    id:4,
    postsNo:'5 Posts',
    bgImg:require('../../images/cate4.jpg').default,
    tag: {color:'#0d30c3', tag:'lifestyle',link:'/#456',},
    btnlink:'/viewpost',
  },

]

const newsMoreFromHypeSliderDetails=[
  {
    id:1,
    bgImg:require('../../images/travel1.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Verizon and Snap to Work Together on 5G-Enhanced Social Media',
    headinglink:'/head',
    dateAndTime:{author:'Inhype', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#fff' ,fontSize:'12px'},
  },
  {
    id:2,
    bgImg:require('../../images/travel2.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Verizon and Snap to Work Together on 5G-Enhanced Social Media',
    headinglink:'/head',
    dateAndTime:{author:'Inhype', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#fff' ,fontSize:'12px'},
    newsPlay:<NewsPlayBtn />,
  },
  {
    id:3,
    bgImg:require('../../images/travel1.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Verizon and Snap to Work Together on 5G-Enhanced Social Media',
    headinglink:'/head',
    dateAndTime:{author:'Inhype', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#fff' ,fontSize:'12px'},
  }
]

const newsVideoDetailsRight=[
  {
    id:1,
    bgImg:require('../../images/travel1.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'12 ways to travel more sustainably that you haven"t thought of yet',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#fff' ,fontSize:'12px'},
  },
  {
    id:2,
    bgImg:require('../../images/travel1.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'A Place Where Technology Meets Craftsmanship',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#fff' ,fontSize:'12px'},
    playbtn:<NewsPlayBtn />,
  },
]


const newsVideoDetailsLeft={
    bgImg:require('../../images/travel1.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'How fashion startups get accepted into tech accelerators',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#fff' ,fontSize:'12px'},
}
const lastseccol1row1=[
  {
    background:require('../../assets/images/popup.jpg').default,
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:'hello world hello world hello world',
    paragraph:'hello world hello world hello world',
  },
  {
    background:require('../../assets/images/popup.jpg').default,
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:'hello world hello world hello world',
    paragraph:'hello world hello world hello world',
  },
  {
    background:require('../../assets/images/popup.jpg').default,
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:'hello world hello world hello world',
    paragraph:'hello world hello world hello world',
  },
  {
    background:require('../../assets/images/popup.jpg').default,
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:'hello world hello world hello world',
    paragraph:'hello world hello world hello world',
  },
  {
    background:require('../../assets/images/popup.jpg').default,
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:'hello world hello world hello world',
    paragraph:'hello world hello world hello world',
  },
  {
    background:require('../../assets/images/popup.jpg').default,
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:'hello world hello world hello world',
    paragraph:'hello world hello world hello world',
  },
  {
    background:require('../../assets/images/popup.jpg').default,
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:'hello world hello world hello world',
    paragraph:'hello world hello world hello world',
  },
  {
    background:require('../../assets/images/popup.jpg').default,
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:'hello world hello world hello world',
    paragraph:'hello world hello world hello world',
  },
]
const lastsecCol1=[
  {
    background:require('../../assets/images/popup.jpg').default,
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:'hello world hello world hello world',
    paragraph:'sdhfbsdj aksdhsjdn kasjdn a kasdjasl'
  },
]
const mainTopCol1=[
  {
    background:require('../../assets/images/popup.jpg').default,
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:'hello world hello world hello world',
  },
  {
    background:require('../../assets/images/popup.jpg').default,
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:'hello world hello world hello world',
  }
]
const mainTopCol2=[
  {
    background:require('../../assets/images/popup.jpg').default,
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:'hello world hello world hello world',
    paragraph:'hello world hello world hello world hello world hello world hello world'

  }
]
const mainTopCol3=[
  {
    background:require('../../assets/images/popup.jpg').default,
    ratingBgColor:'blue',
    rating:'8.5',
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:'hello world hello world hello world',
  },
  {
    background:require('../../assets/images/popup.jpg').default,
    ratingBgColor:'blue',
    rating:'8.5',
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:'hello world hello world hello world',
  }

]
const articelpopular=[
  {
    background:require('../../assets/images/popup.jpg').default,
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:'hello world hello world hello world',
  },
  {
    background:require('../../assets/images/popup.jpg').default,
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:'hello world hello world hello world',
  },
]
const stories=[
  {
    background:require('../../assets/images/popup.jpg').default,
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:'hello world hello world hello world',
  },
  {
    background:require('../../assets/images/popup.jpg').default,
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:'hello world hello world hello world',
  },
  {
    background:require('../../assets/images/popup.jpg').default,
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:'hello world hello world hello world',
  },
  {
    background:require('../../assets/images/popup.jpg').default,
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:'hello world hello world hello world',
  },

]
const InHype=[
  { background:require('../../assets/images/popup.jpg').default,
  tagColor:'$--blue',
  tagName:'Buisness',
  heading:`The City of London Wants To Have Its
  Brexit Cake and Eat It Too`, 
  },

  { background:require('../../assets/images/popup.jpg').default,
  tagColor:'$--blue',
  tagName:'Buisness',
  heading:`The City of London Wants To Have Its
  Brexit Cake and Eat It Too`, 
  },
  { background:require('../../assets/images/popup.jpg').default,
  tagColor:'$--blue',
  tagName:'Buisness',
  heading:`The City of London Wants To Have Its
  Brexit Cake and Eat It Too`, 
  },
  { background:require('../../assets/images/popup.jpg').default,
  tagColor:'$--blue',
  tagName:'Buisness',
  heading:`The City of London Wants To Have Its
  Brexit Cake and Eat It Too`, 
  },
  { background:require('../../assets/images/popup.jpg').default,
  tagColor:'$--blue',
  tagName:'Buisness',
  heading:`The City of London Wants To Have Its
  Brexit Cake and Eat It Too`, 
  },
]

const income=[
  {
    id:1,
    bgImg:require('../../assets/images/popup.jpg').default,
    tag:[
      {id:1,color:'orange', tag:'lifestyle',link:'/#456',},
      {id:2,color:'#2568ef', tag:'markets',link:'/#456',}
    ],
    heading:'Verizon and Snap to Work Together on 5G-Enhanced Social Media',
    headinglink:'/head',
    dateAndTime:{author:'Inhype', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:2,
    bgImg:require('../../assets/images/popup.jpg').default,
    tag:[
      {id:1,color:'orange', tag:'lifestyle',link:'/#456',},
      {id:2,color:'#2568ef', tag:'markets',link:'/#456',}
    ],
    heading:'Verizon and Snap to Work Together on 5G-Enhanced Social Media',
    headinglink:'/head',
    dateAndTime:{author:'Inhype', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:3,
    bgImg:require('../../assets/images/popup.jpg').default,
    tag:[
      {id:1,color:'orange', tag:'lifestyle',link:'/#456',},
      
    ],
    heading:'Verizon and Snap to Work Together on 5G-Enhanced Social Media',
    headinglink:'/head',
    dateAndTime:{author:'Inhype', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:4,
    bgImg:require('../../assets/images/popup.jpg').default,
    tag:[
      {id:1,color:'orange', tag:'lifestyle',link:'/#456',},
      {id:2,color:'#2568ef', tag:'markets',link:'/#456',}
    ],
    heading:'Verizon and Snap to Work Together on 5G-Enhanced Social Media',
    headinglink:'/head',
    dateAndTime:{author:'Inhype', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },

]
const selected=[
  {
   col1:[{
    id:1,
    backgroundImage:require('../../assets/images/popup.jpg').default,
    tag:[{color:'orange', tag:'lifestyle',link:'/#456',},
    {color:'orange', tag:'lifestyle',link:'/#456',},],
    heading:'Verizon and Snap to Work Together on 5G-Enhanced Social Media',
    paragraph:'sjdfhsksdlsdflskdnsfs',
    dateAndTime:{author:'Inhype', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
   },
  {
    id:2,
    backgroundImage:require('../../assets/images/popup.jpg').default,
    tag:[{color:'orange', tag:'lifestyle',link:'/#456',},
    {color:'orange', tag:'lifestyle',link:'/#456',},],
    heading:'Verizon and Snap to Work Together on 5G-Enhanced Social Media',
    paragraph:'sjdfhsksdlsdflskdnsfs',
    dateAndTime:{author:'Inhype', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  }],
    col2:[{id:1,
      bgImg:require('../../assets/images/popup.jpg').default,
      tag: {color:'orange', tag:'lifestyle',link:'/#456',},
      head:'12 ways to travel more sustainably that you haven"t thought of yet',
      headlink:'/head',
      dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#fff' ,fontSize:'12px'},},
      {id:2,
        bgImg:require('../../assets/images/popup.jpg').default,
        tag: {color:'orange', tag:'lifestyle',link:'/#456',},
        head:'12 ways to travel more sustainably that you haven"t thought of yet',
        headlink:'/head',
        dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#fff' ,fontSize:'12px'},}]
    
    
  },
  
]
const weekends=[

  {
    id:1,
    backgroundImage:require('../../assets/images/popup.jpg').default,
    tag:{color:'orange', tag:'lifestyle',link:'/#456',},
   
    heading:'Verizon and Snap to Work Together on 5G-Enhanced Social Media',
    paragraph:`Verizon and Snap to Work Together on 5G-Enhanced Social Media
    Verizon and Snap to Work Together on 5G-Enhanced Social Media`,
    col2:[ {
      col2heading:'hello world hello world hello world',
      col2headinglink:'/head',
      col2tag:{color:'orange', tag:'lifestyle',link:'/#456',},
      col2dateAndTime:{author:'Inhype', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    },
    {
      col2heading:'hello world hello world hello world',
      col2headinglink:'/head',
      col2tag:{color:'orange', tag:'lifestyle',link:'/#456',},
      col2dateAndTime:{author:'Inhype', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    },
    {
      col2heading:'hello world hello world hello world',
      col2headinglink:'/head',
      col2tag:{color:'orange', tag:'lifestyle',link:'/#456',},
      col2dateAndTime:{author:'Inhype', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    },
    {
      col2heading:'hello world hello world hello world',
      col2headinglink:'/head',
      col2tag:{color:'orange', tag:'lifestyle',link:'/#456',},
      col2dateAndTime:{author:'Inhype', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    }],
    dateAndTime:{author:'Inhype', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    
  },
]
const weekendscol2=[
  
   
  
]
const quickTake=[
  {
    id:1,
    bgImg:require('../../images/travel1.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Verizon and Snap to Work Together on 5G-Enhanced Social Media',
    headinglink:'/head',
    dateAndTime:{author:'Inhype', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:2,
    bgImg:require('../../images/travel2.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Verizon and Snap to Work Together on 5G-Enhanced Social Media',
    headinglink:'/head',
    dateAndTime:{author:'Inhype', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    newsPlay:<NewsPlayBtn />,
  },
  {
    id:3,
    bgImg:require('../../images/travel1.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Verizon and Snap to Work Together on 5G-Enhanced Social Media',
    headinglink:'/head',
    dateAndTime:{author:'Inhype', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  }
]
const journalSlider=[
  {
    id:1,
    bgImg:require('../../images/travel1.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Verizon and Snap to Work Together on 5G-Enhanced Social Media',
    headinglink:'/head',
    dateAndTime:{author:'Inhype', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:2,
    bgImg:require('../../images/travel2.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Verizon and Snap to Work Together on 5G-Enhanced Social Media',
    headinglink:'/head',
    dateAndTime:{author:'Inhype', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    newsPlay:<NewsPlayBtn />,
  },
  {
    id:3,
    bgImg:require('../../images/travel1.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Verizon and Snap to Work Together on 5G-Enhanced Social Media',
    headinglink:'/head',
    dateAndTime:{author:'Inhype', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  }
]

const markets=[
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  }
  
]

const latestJournal=[
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
]
const ArticlelatestPost=[
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
]
const mostVisit=[
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },{
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  }, 

  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },

]
const outPost=[
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
]
const politics=[
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  },
  {
    tagColor:'$--blue',
    tagName:'Buisness',
    heading:`The City of London Wants To Have Its
    Brexit Cake and Eat It Too`, 

  }
]
const topSlider=[
  {
    id:1,
    bgImg:require('../../images/travel1.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Verizon and Snap to Work Together on 5G-Enhanced Social Media',
    headinglink:'/head',
    dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:2,
    bgImg:require('../../images/travel2.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Verizon and Snap to Work Together on 5G-Enhanced Social Media',
    headinglink:'/head',
    dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    
    
  },
  {
    id:3,
    bgImg:require('../../images/travel1.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Verizon and Snap to Work Together on 5G-Enhanced Social Media',
    headinglink:'/head',
    dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  }
]

const newsSelectedPostsDetails=
  {
    col1tag: {color:'orange', tag:'travel',link:'/#456',},
    col1heading:'A Design Lover’s Guide To Mexico City',
    col1headinglink:'/head',
    col1dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    col1para:'Choosing an online appointment software that supports multiple payment methods will make the whole process much easier and faster and your customers…',
    col1bottom:[
      {
        id:1,
        bgImg:require('../../images/travel1.jpg').default,
        heading:'Design Trend Report takeaways: New ways to recruit design talent',
        headinglink:'/head',
        dateAndTime:{date:'December 10,2019'  ,color:'#9f9f9f' ,fontSize:'12px'},
      },
      {
        id:2,
        bgImg:require('../../images/travel1.jpg').default,
        heading:'Supporting the People Behind the Product',
        headinglink:'/head',
        dateAndTime:{date:'December 10,2019' ,color:'#9f9f9f' ,fontSize:'12px'},
      }
     ],
    col2:[
      {
        id:1,
        tag: {color:'orange', tag:'travel',link:'/#456',},
        heading:'The World"s Most Refined Mountaineering Equipmen',
        headinglink:'/head',
        dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
      },
      {
        id:2,
        tag: {color:'orange', tag:'business',link:'/#456',},
        heading:'Apple expands and updates its ‘Everyone Can Code’ program',
        headinglink:'/head',
        dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
      },
      {
        id:3,
        tag: {color:'orange', tag:'lifestyle',link:'/#456',},
        heading:'Talisker Bay on the Isle of Skye in Scotland',
        headinglink:'/head',
        dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
      },
      {
        id:4,
        tag: {color:'orange', tag:'lifestyle',link:'/#456',},
        heading:'Otter Surfboards in Pacific Ocean with friends',
        headinglink:'/head',
        dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
      },
    ],
    col3bgImg:require('../../images/travel1.jpg').default,
    col3tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    col3heading:'The Biggest Moments in 2019, Explained Through Graphics',
    col3headinglink:'/head',
    col3dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    
  }
  
const journalSelected=
{
  col1tag: {color:'orange', tag:'travel',link:'/#456',},
  col1heading:'A Design Lover’s Guide To Mexico City',
  col1headinglink:'/head',
  col1dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  col1para:'Choosing an online appointment software that supports multiple payment methods will make the whole process much easier and faster and your customers…',
  col1bottom:[
    {
      id:1,
      bgImg:require('../../images/travel1.jpg').default,
      heading:'Design Trend Report takeaways: New ways to recruit design talent',
      headinglink:'/head',
      dateAndTime:{date:'December 10,2019'  ,color:'#9f9f9f' ,fontSize:'12px'},
    },
    {
      id:2,
      bgImg:require('../../images/travel1.jpg').default,
      heading:'Supporting the People Behind the Product',
      headinglink:'/head',
      dateAndTime:{date:'December 10,2019' ,color:'#9f9f9f' ,fontSize:'12px'},
    }
   ],
  col2:[
    {
      id:1,
      tag: {color:'orange', tag:'travel',link:'/#456',},
      heading:'The World"s Most Refined Mountaineering Equipmen',
      headinglink:'/head',
      dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    },
    {
      id:2,
      tag: {color:'orange', tag:'business',link:'/#456',},
      heading:'Apple expands and updates its ‘Everyone Can Code’ program',
      headinglink:'/head',
      dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    },
    {
      id:3,
      tag: {color:'orange', tag:'lifestyle',link:'/#456',},
      heading:'Talisker Bay on the Isle of Skye in Scotland',
      headinglink:'/head',
      dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    },
    {
      id:4,
      tag: {color:'orange', tag:'lifestyle',link:'/#456',},
      heading:'Otter Surfboards in Pacific Ocean with friends',
      headinglink:'/head',
      dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    },
  ],
  col3bgImg:require('../../images/travel1.jpg').default,
  col3tag: {color:'orange', tag:'lifestyle',link:'/#456',},
  col3heading:'The Biggest Moments in 2019, Explained Through Graphics',
  col3headinglink:'/head',
  col3dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  
}

  const newsWhatsTrendingTodayDetails=[
    {
      id:1,
      bgImage:require('../../images/todayh1.jpg').default,
      tag: {color:'orange', tag:'lifestyle',link:'/#456',},
      heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
      headinglink:'/head',
      dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    },
    {
      id:2,
      bgImage:require('../../images/todayh2.jpg').default,
      tag: {color:'orange', tag:'lifestyle',link:'/#456',},
      heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
      headinglink:'/head',
      dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    },
    {
      id:3,
      bgImage:require('../../images/todayh3.jpg').default,
      newsPlay:<NewsPlayBtn />,
      tag: {color:'orange', tag:'lifestyle',link:'/#456',},
      heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
      headinglink:'/head',
      dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    },
    {
      id:4,
      bgImage:require('../../images/todayh1.jpg').default,
      rating:<NewsRating bgColor="#4545e8" rating='8.5'/>,
      tag: {color:'orange', tag:'lifestyle',link:'/#456',},
      heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
      headinglink:'/head',
      dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    },
    {
      id:5,
      bgImage:require('../../images/todayh2.jpg').default,
      tag: {color:'orange', tag:'lifestyle',link:'/#456',},
      heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
      headinglink:'/head',
      dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    },
    {
      id:6,
      bgImage:require('../../images/todayh3.jpg').default,
      newsPlay:<NewsPlayBtn />,
      tag: {color:'orange', tag:'lifestyle',link:'/#456',},
      heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
      headinglink:'/head',
      dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    },
    {
      id:7,
      bgImage:require('../../images/todayh1.jpg').default,
      rating:<NewsRating bgColor="#4545e8" rating='8.5'/>,
      tag: {color:'orange', tag:'lifestyle',link:'/#456',},
      heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
      headinglink:'/head',
      dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    },
    {
      id:8,
      bgImage:require('../../images/todayh2.jpg').default,
      rating:<NewsRating bgColor="#4545e8" rating='8.5'/>,
      tag: {color:'orange', tag:'lifestyle',link:'/#456',},
      heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
      headinglink:'/head',
      dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    },
    {
      id:9,
      bgImage:require('../../images/todayh3.jpg').default,
      tag: {color:'orange', tag:'lifestyle',link:'/#456',},
      heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
      headinglink:'/head',
      dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    },
    {
      id:10,
      bgImage:require('../../images/todayh1.jpg').default,
      rating:<NewsRating bgColor="#4545e8" rating='8.5'/>,
      tag: {color:'orange', tag:'lifestyle',link:'/#456',},
      heading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
      headinglink:'/head',
      dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    },
  ]

  const newsLastWholeSectionDetails={

    col1topbgImage:require('../../images/tech1.jpg').default,
    col1toptag: {color:'orange', tag:'business',link:'/#456',},
    col1topheading:'Apple’s iPhone 11 Pro battery case sports a new camera button',
    col1topheadinglink:'/head',
    col1topdateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#fff' ,fontSize:'12px'},


    col1bottom:[
      {
        id:1,
        bgImage:require('../../images/tech2.jpg').default,
        playbtn:<NewsPlayBtn />,
        tag: {color:'orange', tag:'lifestyle',link:'/#456',},
        heading:'Five Things You Need to Know to Start Your Day',
        headinglink:'/head',
        dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
        para:'From there, we generally start working on visual concepts that can make that vision more tangible. Our stakeholders are often editors with…',
      },
      {
        id:2,
        bgImage:require('../../images/tech3.jpg').default,
        tag: {color:'orange', tag:'lifestyle',link:'/#456',},
        heading:'Five Things You Need to Know to Start Your Day',
        headinglink:'/head',
        dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
        para:'From there, we generally start working on visual concepts that can make that vision more tangible. Our stakeholders are often editors with…',
      },
      {
        id:3,
        bgImage:require('../../images/tech1.jpg').default,
        tag: {color:'orange', tag:'lifestyle',link:'/#456',},
        heading:'Five Things You Need to Know to Start Your Day',
        headinglink:'/head',
        dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
        para:'From there, we generally start working on visual concepts that can make that vision more tangible. Our stakeholders are often editors with…',
      },
      {
        id:4,
        bgImage:require('../../images/tech2.jpg').default,
        rating:<NewsRating bgColor="#4545e8" rating='8.5'/>,
        tag: {color:'orange', tag:'lifestyle',link:'/#456',},
        heading:'Five Things You Need to Know to Start Your Day',
        headinglink:'/head',
        dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
        para:'From there, we generally start working on visual concepts that can make that vision more tangible. Our stakeholders are often editors with…',
      },
      {
        id:5,
        bgImage:require('../../images/tech3.jpg').default,
        rating:<NewsRating bgColor="#4545e8" rating='8.5'/>,
        tag: {color:'orange', tag:'lifestyle',link:'/#456',},
        heading:'Five Things You Need to Know to Start Your Day',
        headinglink:'/head',
        dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
        para:'From there, we generally start working on visual concepts that can make that vision more tangible. Our stakeholders are often editors with…',
      },
      {
        id:6,
        bgImage:require('../../images/tech1.jpg').default,
        tag: {color:'orange', tag:'lifestyle',link:'/#456',},
        heading:'Five Things You Need to Know to Start Your Day',
        headinglink:'/head',
        dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
        para:'From there, we generally start working on visual concepts that can make that vision more tangible. Our stakeholders are often editors with…',
      },
      {
        id:7,
        bgImage:require('../../images/tech2.jpg').default,
        tag: {color:'orange', tag:'lifestyle',link:'/#456',},
        heading:'Five Things You Need to Know to Start Your Day',
        headinglink:'/head',
        dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
        para:'From there, we generally start working on visual concepts that can make that vision more tangible. Our stakeholders are often editors with…',
      },
      {
        id:8,
        bgImage:require('../../images/tech3.jpg').default,
        tag: {color:'orange', tag:'lifestyle',link:'/#456',},
        heading:'Five Things You Need to Know to Start Your Day',
        headinglink:'/head',
        dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
        para:'From there, we generally start working on visual concepts that can make that vision more tangible. Our stakeholders are often editors with…',
      },
      {
        id:9,
        bgImage:require('../../images/tech1.jpg').default,
        playbtn:<NewsPlayBtn />,
        tag: {color:'orange', tag:'lifestyle',link:'/#456',},
        heading:'Five Things You Need to Know to Start Your Day',
        headinglink:'/head',
        dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
        para:'From there, we generally start working on visual concepts that can make that vision more tangible. Our stakeholders are often editors with…',
      },
      {
        id:10,
        bgImage:require('../../images/tech2.jpg').default,
       
        tag: {color:'orange', tag:'lifestyle',link:'/#456',},
        heading:'Five Things You Need to Know to Start Your Day',
        headinglink:'/head',
        dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
        para:'From there, we generally start working on visual concepts that can make that vision more tangible. Our stakeholders are often editors with…',
      },
      {
        id:11,
        bgImage:require('../../images/tech3.jpg').default,
        tag: {color:'orange', tag:'lifestyle',link:'/#456',},
        heading:'Five Things You Need to Know to Start Your Day',
        headinglink:'/head',
        dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
        para:'From there, we generally start working on visual concepts that can make that vision more tangible. Our stakeholders are often editors with…',
      },
      {
        id:12,
        bgImage:require('../../images/tech1.jpg').default,
        rating:<NewsRating bgColor="#4545e8" rating='8.5'/>,
        tag: {color:'orange', tag:'lifestyle',link:'/#456',},
        heading:'Five Things You Need to Know to Start Your Day',
        headinglink:'/head',
        dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
        para:'From there, we generally start working on visual concepts that can make that vision more tangible. Our stakeholders are often editors with…',
      },
      {
        id:13,
        bgImage:require('../../images/tech2.jpg').default,
        playbtn:<NewsPlayBtn />,
        tag: {color:'orange', tag:'lifestyle',link:'/#456',},
        heading:'Five Things You Need to Know to Start Your Day',
        headinglink:'/head',
        dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
        para:'From there, we generally start working on visual concepts that can make that vision more tangible. Our stakeholders are often editors with…',
      },
      {
        id:14,
        bgImage:require('../../images/tech3.jpg').default,
        tag: {color:'orange', tag:'lifestyle',link:'/#456',},
        heading:'Five Things You Need to Know to Start Your Day',
        headinglink:'/head',
        dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
        para:'From there, we generally start working on visual concepts that can make that vision more tangible. Our stakeholders are often editors with…',
      },
    ],

    col2latestPosts:[
      {
        id:1,
        bgImage:require('../../images/tech1.jpg').default,
        tag: {color:'orange', tag:'lifestyle',link:'/#456',},
        heading:'Five Things You Need to Know to Start Your Day',
        headinglink:'/head',
        dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
      },
      {
        id:2,
        bgImage:require('../../images/tech2.jpg').default,
        tag: {color:'orange', tag:'lifestyle',link:'/#456',},
        heading:'Five Things You Need to Know to Start Your Day',
        headinglink:'/head',
        dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
      },
      {
        id:3,
        playbtn:<NewsPlayBtn />,
        bgImage:require('../../images/tech3.jpg').default,
        tag: {color:'orange', tag:'lifestyle',link:'/#456',},
        heading:'Five Things You Need to Know to Start Your Day',
        headinglink:'/head',
        dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
      },
    ],

    col2individualIntro:
      {
        name:'James',
        para:'The functional aspect comes first in the work process because it’s the core of the object: What is its purpose? something else? Shape, texture and material come next.',
        bgImage:require('../../images/tech1.jpg').default,
        aboutmelink:'/abutme',
      },

    col2popular:[
      {
        id:1,
        bgImage:require('../../images/tech2.jpg').default,
        heading:'Netflix Price Cuts Are Heating Up India’s Streaming War',
        headinglink:'/head',
        dateAndTime:{date:'December 10,2019'  ,color:'#9f9f9f' ,fontSize:'12px'},
      },
      {
        id:2,
        bgImage:require('../../images/tech3.jpg').default,
        heading:'Five Things You Need to Know to Start Your Day',
        headinglink:'/head',
        dateAndTime:{date:'December 10,2019' ,color:'#9f9f9f' ,fontSize:'12px'},
      },
      {
        id:3,
        bgImage:require('../../images/tech1.jpg').default,
        heading:'Five Things You Need to Know to Start Your Day',
        headinglink:'/head',
        dateAndTime:{date:'December 10,2019' ,color:'#9f9f9f' ,fontSize:'12px'},
      },
      {
        id:4,
        bgImage:require('../../images/tech2.jpg').default,
        heading:'Five Things You Need to Know to Start Your Day',
        headinglink:'/head',
        dateAndTime:{date:'December 10,2019' ,color:'#9f9f9f' ,fontSize:'12px'},
      },
    ] ,
    
    
    col2subscribeAndfollow:[
      {
        id:1,
        socialmedianame:'Facebook',
        socialmedialink:'https://www.facebook.com/Medicos.int7',
        likes:'63k',
        logo:faFacebookF,
        bgColor:'#4267b2',
      },
      {
        id:3,
        socialmedianame:'Instagram',
        socialmedialink:'https://www.instagram.com/medicos.international/',
        likes:'12.2k',
        logo:faInstagram,
        bgColor:'#369',
      },
      {
        id:2,
        socialmedianame:'Twitter',
        socialmedialink:'https://twitter.com/medicosint7',
        likes:'',
        logo:faTwitter,
        bgColor:'#1da1f2',
      },
      
      {
        id:4,
        socialmedianame:'Youtube',
        socialmedialink:'https://www.youtube.com/channel/UCjPxl-Mpqkilfsmv9yT5ZvQ',
        likes:'',
        logo:faYoutube,
        bgColor:'#f61004',
      }
    ]
    
    
  }
  
const worldwideDetails=[
  {
    id:1,
    bgImg:require('../../assets/images/popup.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    head:'12 ways to travel more sustainably that you haven"t thought of yet',
    headlink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#fff' ,fontSize:'12px'},
  },
  {
    id:2,
    bgImg:require('../../images/travel2.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    head:'Talisker Bay on the Isle of Skye in Scotland',
    headlink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#fff' ,fontSize:'12px'},
  },
  {
    id:3,
    bgImg:require('../../images/travel3.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    head:'12 ways to travel more sustainably that you haven"t thought of yet',
    headlink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#fff' ,fontSize:'12px'},
  },
  {
    id:4,
    bgImg:require('../../images/travel1.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    head:'12 ways to travel more sustainably that you haven"t thought of yet',
    headlink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#fff' ,fontSize:'12px'},
  },
  {
    id:5,
    bgImg:require('../../images/travel2.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    head:'12 ways to travel more sustainably that you haven"t thought of yet',
    headlink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#fff' ,fontSize:'12px'},
  },
  {
    id:6,
    bgImg:require('../../images/travel3.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    head:'12 ways to travel more sustainably that you haven"t thought of yet',
    headlink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#fff' ,fontSize:'12px'},
  },
]

const newsDetailsTopBackground={
  bgImage:require('../../images/tech1.jpg').default,
  rating:<NewsRating bgColor="#4545e8" rating='8.5'/>,
  tags: [
    {id:1,color:'orange', tag:'lifestyle',link:'/#456',},
    {id:2,color:'orange', tag:'lifestyle',link:'/#456',},
     ],
   heading:'Five Things You Need to Know to Start Your Day',
   dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
   likesAndLove:[
     {
       id:1,
       img:faBolt,
       likesAndloveNo:233,

     },
     {
       id:2,
      img:faHeart,
      likesAndloveNo:233,
      
    }
   ]  ,
   socialBtn:[
     {
       id:1,
       img:faFacebookF,
       color:'#3b5998',
       link:'https://www.facebook.com/Medicos.int7',
     },
     {
      id:2,
      img:faTwitter,
      color:'#00aced',
      link:'https://twitter.com/medicosint7',
    },
    {
      id:3,
      img:faLinkedinIn,
      color:'#1178b3',
      link:'https://www.linkedin.com/company/medicosnpl/',
    },
    {
      id:4,
      img:faPinterest,
      color:'#cb2027',
      link:'http://www.pinterest.com/Medicosinternational',
    },
   ]

}
const newsIntroductionCardDetails=
{
  name:'James',
  para:'The functional aspect comes first in the work process because it’s the core of the object: What is its purpose? something else? Shape, texture and material come next.',
  bgImage:require('../../images/tech1.jpg').default,
  aboutmelink:'/abutme',
}

const newsDetailTrendingDetails=[
  {
    id:1,
    bgImg:require('../../images/travel3.jpg').default,
    head:'Five Things You Need to Know to Start Your Day',
    headlink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:2,
    bgImg:require('../../images/travel3.jpg').default,
    head:'How fashion startups get accepted into tech accelerators',
    headlink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:3,
    bgImg:require('../../images/travel3.jpg').default,
    head:'12 ways to travel more sustainably that you haven"t thought of yet',
    headlink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
  {
    id:4,
    bgImg:require('../../images/travel3.jpg').default,
    head:'Netflix Price Cuts Are Heating Up India’s Streaming War',
    headlink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
  },
]

const newsDetailInHypeSponsoredDetails=[
  {
    id:1,
    bgImage:require('../../images/tech1.jpg').default,
   rating:<NewsRating bgColor="#4545e8" rating='8.5'/>,
    tags:  {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Five Things You Need to Know to Start Your Day',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#fff' ,fontSize:'12px'},
  },
  {
    id:2,
    bgImage:require('../../images/tech2.jpg').default,
   rating:<NewsRating bgColor="#4545e8" rating='8.5'/>,
    tags:  {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Five Things You Need to Know to Start Your Day',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#fff' ,fontSize:'12px'},
  },
  {
    id:3,
    bgImage:require('../../images/tech3.jpg').default,
   rating:<NewsRating bgColor="#4545e8" rating='8.5'/>,
    tags:  {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Five Things You Need to Know to Start Your Day',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#fff' ,fontSize:'12px'},
  }
]

const newsDetailCategoriesDetails=[
  {
    id:1,
    postsNo:'5 Posts',
    bgImg:require('../../images/cate1.jpg').default,
    tag: {color:'#994db1', tag:'lifestyle',link:'/#456',},
   
  },
  {
    id:2,
    postsNo:'5 Posts',
    bgImg:require('../../images/cate2.jpg').default,
    tag: {color:'#2590ed', tag:'lifestyle',link:'/#456',},
  },
  {
    id:3,
    postsNo:'5 Posts',
    bgImg:require('../../images/cate3.jpg').default,
    tag: {color:'#c74970', tag:'lifestyle',link:'/#456',},
   
  },
  {
    id:4,
    postsNo:'5 Posts',
    bgImg:require('../../images/cate4.jpg').default,
    tag: {color:'#0d30c3', tag:'lifestyle',link:'/#456',},

  },
  {
    id:5,
    postsNo:'5 Posts',
    bgImg:require('../../images/cate2.jpg').default,
    tag: {color:'#2590ed', tag:'lifestyle',link:'/#456',},
  },

]

 const newsDetailFollowUsDetails=[
  {
    id:1,
    socialmedianame:'Facebook',
    socialmedialink:'https://www.facebook.com/Medicos.int7',
    likes:'63k',
    logo:faFacebookF,
    bgColor:'#4267b2',
  },
 
  {
    id:3,
    socialmedianame:'Instagram',
    socialmedialink:'https://www.instagram.com/medicos.international/',
    likes:'12.2k',
    logo:faInstagram,
    bgColor:'#369',
  },
  {
    id:2,
    socialmedianame:'Twitter',
    socialmedialink:'https://twitter.com/medicosint7',
    likes:'',
    logo:faTwitter,
    bgColor:'#1da1f2',
  },
  {
    id:4,
    socialmedianame:'Youtube',
    socialmedialink:'https://www.youtube.com/channel/UCjPxl-Mpqkilfsmv9yT5ZvQ',
    likes:'',
    logo:faInstagram,
    bgColor:'#f61004',
  }
]

const newsDetailRelatedPostsDetails=[
  {
    id:1,
    bgImage:require('../../images/tech2.jpg').default,
    rating:<NewsRating bgColor="#4545e8" rating='8.5'/>,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Five Things You Need to Know to Start Your Day',
    headinglink:'/head',
    dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    para:'What matters is understanding the hows and whys of trends’ emergence and adoption. Because at the end of the day, trends have…',
  },
  {
    id:2,
    bgImage:require('../../images/tech3.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Five Things You Need to Know to Start Your Day',
    headinglink:'/head',
    dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    para:'Julie believes that the individual contributor (IC) track should be full of possibilities for leadership, even though the roles aren’t always structured…',
  },
  {
    id:3,
    bgImage:require('../../images/tech1.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'Five Things You Need to Know to Start Your Day',
    headinglink:'/head',
    dateAndTime:{author:'Inhype',authorColor:'black', link:'/ram' ,date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    para:'From there, we generally start working on visual concepts that can make that vision more tangible. Our stakeholders are often editors with…',
  },
  
] 

const newsDetailAlsoReadDetails=[
  {
    id:1,
    bgImage:require('../../images/tech2.jpg').default,
    rating:<NewsRating bgColor="#4545e8" rating='8.5'/>,
    tags: [
      {id:1,color:'orange', tag:'lifestyle',link:'/#456',},
    ],
    heading:'How fashion startups get accepted into tech accelerators',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
   
  },
  {
    id:2,
    bgImage:require('../../images/tech3.jpg').default,
    tags: [
      {id:1,color:'orange', tag:'lifestyle',link:'/#456',},
    ],
    heading:'12 ways to travel more sustainably that you haven"t thought of yet',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
   
  },
  {
    id:3,
    bgImage:require('../../images/tech1.jpg').default,
    tags: [
      {id:1,color:'orange', tag:'lifestyle',link:'/#456',},
    ],
    heading:'A Place Where Technology Meets Craftsmanship',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
   
  },
  {
    id:4,
    bgImage:require('../../images/tech1.jpg').default,
    tags: [
      {id:1,color:'orange', tag:'lifestyle',link:'/#456',},
      {id:2,color:'orange', tag:'lifestyle',link:'/#456',},
    ],
    heading:'If You Were to Start a Business From Scratch Tomorrow',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
    
  },
  
] 

const newsDetailMoreFromInHypeDetails=[
  {
    id:1,
    bgImage:require('../../images/tech2.jpg').default,
    rating:<NewsRating bgColor="#4545e8" rating='8.5'/>,
    tag:{color:'orange', tag:'lifestyle',link:'/#456',},

    heading:'How fashion startups get accepted into tech accelerators',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
   
  },
  {
    id:2,
    bgImage:require('../../images/tech3.jpg').default,
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'12 ways to travel more sustainably that you haven"t thought of yet',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
   
  },
  {
    id:3,
    playbtn:<NewsPlayBtn />,
    bgImage:require('../../images/tech1.jpg').default,
    tag:{color:'orange', tag:'lifestyle',link:'/#456',},
    heading:'A Place Where Technology Meets Craftsmanship',
    headinglink:'/head',
    dateAndTime:{date:'December 10,2019' ,readTime:'5 Min read'  ,color:'#9f9f9f' ,fontSize:'12px'},
   
  },
]
const newsDetailFutureFocusedDetails={
  top:[
    {
      id:1,
      bgImage:require('../../images/tech1.jpg').default,
      text:'Runner',
    },
    {
      id:1,
      bgImage:require('../../images/tech1.jpg').default,
      text:'Love Letter',
    },
  ],
  bottombgImg:require('../../images/tech1.jpg').default,
  bottomText:'Startup',
}

const newsDetailAboutAuthorDetails={
  authorImg:require('../../images/client5.jpg').default,
  authorImgLink:'./link',
  authorName:'Manoj',
  authorNameLink:'./author',
  authorIntro:'The functional aspect comes first in the work process because it’s the core of the object: What is its purpose? something else? Shape, texture and material come next.',
  authorArticlesLink:'./linnk',
  AuthorPostsNo:'5 posts',
 
  socialLinks:[
    {
      id:1,
      icon: faFacebookF,
      iconLink:'/fb',
    },
    {
      id:2,
      icon:faTwitter,
      iconLink:'/twit',
    },
    {
      id:3,
      icon:faInstagram,
      iconLink:'/insta',
    },
    {
      id:4,
      icon:faLinkedinIn,
      iconLink:'/ln',
    },
    {
      id:5,
      icon:faMediumM ,
      iconLink:'/med',
    },
  ],

}

const newsDetailNavigationLinksDetails=
  {
   
  prevTitle:'If You Were to Start a Business From Scratch Tomorrow',
  nextTitle:'A Place Where Technology Meets Craftsmanship',
  prevBtnIcon:faArrowLeft,
  nextBtnIcon:faArrowRight,
  prevLink:'/prev',
  nextLink:'/next',
  }
 
  const slideTrending=[
    {
       id:1,
       title:'Information Technology',
       description:'Digital 2020 Global Digital Overview (January 2020) v01 ',
       images:sliderSlides,
    },
    {
      id:2,
      title:'Information Technology',
      description:'Digital 2020 Global Digital Overview (January 2020) v01 ',
      images:sliderSlides,
   },
   {
    id:3,
    title:'Information Technology',
    description:'Digital 2020 Global Digital Overview (January 2020) v01 ',
    images:sliderSlides,
  },
  {
    id:4,
    title:'Information Technology',
    description:'Digital 2020 Global Digital Overview (January 2020) v01 ',
    images:sliderSlides,
  },
  {
    id:5,
    title:'Information Technology',
    description:'Digital 2020 Global Digital Overview (January 2020) v01 ',
    images:sliderSlides,
  },
  {
    id:6,
    title:'Information Technology',
    description:'Digital 2020 Global Digital Overview (January 2020) v01 ',
    images:sliderSlides,
  },
  ]


 const slideRecentSlideDetails=[
   {
     id:1,
     bgImg:require('../../assets/images/slide/slide1.png').default,
     heading:'Information Technology',
     title:'Digital 2020 Global Digital Overview (January 2020) v01',
     profileImg:require('../../assets/images/profile3.png').default,
     name:'Jessica Doe',
     star:'107',
     seen:'107',
     tag: {color:'orange', tag:'lifestyle',link:'/#456',},
   },
   {
    id:2,
    bgImg:require('../../assets/images/slide/slide1.png').default,
    heading:'Information Technology',
     title:'Digital 2020 Global Digital Overview (January 2020) v01',
     profileImg:require('../../assets/images/profile3.png').default,
    name:'Jessica Doe',
    star:'107',
    seen:'107',
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
  },
  {
    id:3,
    bgImg:require('../../assets/images/slide/slide1.png').default,
    heading:'Information Technology',
    title:'Digital 2020 Global Digital Overview (January 2020) v01',
    profileImg:require('../../assets/images/profile3.png').default,
    name:'Jessica Doe',
    star:'107',
    seen:'107',
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
  },
  {
    id:4,
    bgImg:require('../../images/client5.jpg').default, bgImg:require('../../assets/images/slide/slide1.png').default,
    heading:'Information Technology',
    title:'Digital 2020 Global Digital Overview (January 2020) v01',
    profileImg:require('../../assets/images/profile3.png').default,
    name:'Jessica Doe',
    star:'107',
    seen:'107',
    tag: {color:'orange', tag:'lifestyle',link:'/#456',},
  },
 ] 

 

export const footerDetails={
  footerTopDetails:[
    {
      image:require('../../assets/images/footer/booksicon.png').default,
      title:'Books',
      link:'/book',
      count:'5,000' 

    },
    {
      image:require('../../assets/images/footer/journalicon.png').default,
      title:'Articles',
      link:'/article',
      count:'Medical',

    },
    {
      image:require('../../assets/images/footer/newslogo.png').default,
      title:'News',
      link:'/news',
      count:'Latest',

    },
    {
      image:require('../../assets/images/footer/journalicon.png').default,
      title:'journal',
      link:'/journal',
      count:'Top',

    },
    {
      image:require('../../assets/images/footer/slideicon_720.png').default,
      title:'Slides',
      link:'/slide',
      count:'30,000'

    },
  ],
  footerMidDetails:[
    {
      heading:'Product',
      links:[
        {
          linkName:'Medicos pdf',
          url:'https://bookapp.page.link/Review'
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
          linkName:'slider',
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
          url:'/aboutUs'
        },
        {
          linkName:'Team',
          url:'/abc'
        },
        {
          linkName:'Contact us',
          url:'/contactUs'
        },
        {
          linkName:'terms and Conditions',
          url:'/termsAndConditions'
        },
        {
          linkName:'Privacy policy',
          url:'/privacyPolicy'
        },
      ]
    },
    {
      heading:'Resources',
      links:[
        {
          linkName:'Health Patra',
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
      link:'/termsAndConditions',
    },
    {
      title:'Privacy Policy',
      link:'/privacyPolicy',
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
  ["Overview", "Uploads", "Liked",
    "Preference"]
const homeAwesomeProductDetails=[
      {
        id:1,
        details:{
          Icon: require('../../assets/images/appIcon/pdf.png').default,
          productTitle: "MEDICOS PDF",
          productDetails: `Downloading one app for books, another for slides, yet another for notes, and yet another
           for additional medical resources is time consuming and takes up a lot of space on your phone.
          As a result of extensive research and brainstorming, the Medicos team has developed the Medicos Pdf app.`,
          bottomIcon: <FiDownload style={{ color: `$--primary` }} />,
          bottomLabel: "Download Now",
          bottomButtontype: "primary-link",
          bottomButtonLink:"  https://bookapp.page.link/Review",
        },
      },
      {
        id:2,
        details:{
          Icon: require('../../assets/images/appIcon/abb_icon.png').default,
          productTitle: "MEDICOS ABBREVIATION",
          productDetails: `Medicos Abbreviations is a free and easy to use dictionary of most popular English medical abbreviations and terms. This comprehensive offline reference
           for commonly used medical acronyms gives you easy access to thousands of medical terms with their full meanings,.`,
          bottomIcon: <FiDownload style={{ color: `$--primary` }} />,
          bottomLabel: "Download Now",
          bottomButtontype: "success-link",
          bottomButtonLink:" https://abbre.page.link/App"
        },
      },
      {
        id:3,
        details:{
          Icon:require('../../assets/images/appIcon/medicine_logo.jpg').default,
          productTitle: "MEDICOS MEDICINE",
          productDetails: `“Medicos Medicine” is an internal medicine app based on the collection Student’s Note. Completely free for all, this app will allow any physician, resident or medical student to access up-to-date medical information and 
          guidelines quickly and efficiently.It is is a handy and useful tool to learn clinical examination and skills on the go.`,
          bottomIcon: <FiDownload style={{ color: `$--primary` }} />,
          bottomLabel: "Download Now",
          bottomButtontype: "warning-link",
          bottomButtonLink:"https://medicosmedicine.page.link/APp"
        },
      },
      {
        id:4,
        details:{
          Icon: require('../../assets/images/appIcon/ECG.png').default,
          //iconImageColor:,
          productTitle: "MEDICOS ECG",
          productDetails: `Downloading one app for books, another for slides, yet another for notes, and yet another for additional medical resources is time consuming and takes up a lot of space on your phone.
  
          As a result of extensive research and brainstorming, the Medicos team has developed the Medicos Pdf app.`,
          bottomIcon: <FiDownload style={{ color: `$--primary` }} />,
          bottomLabel: "Download Now",
          bottomButtontype: "primary-link",
          bottomButtonLink:"https://ecgmedi.page.link/play-store-update-from-app"
        },
      },
      {
        id:5,
        details:{
          Icon: require('../../assets/images/appIcon/radio_logo.jpg').default,
          productTitle: "MEDICOS RADIOLOGY",
          productDetails: `Medicos Radiology application is a study aid that provides a series of radiographic images for
           doctors & medical students to self-test their level of knowledge and ability
           to recognize structures and pathologies in the human body through radiographic image ( x-Ray , CTSCAN , MRI ). `,
           bottomIcon: <FiDownload style={{ color: `$--primary` }} />,
           bottomLabel: "Download Now",
          bottomButtontype: "success-link",
          bottomButtonLink:"https://mradio.page.link/app"
        },
      },
      {
        id:6,
        details:{
          Icon: require('../../assets/images/appIcon/pedia_logo.jpg').default,
          productTitle: "MEDICOS PEDIATRIC",
          productDetails: `Medicos Pediatric is app that is useful for history taking and clinical examination of Pediatric patients Combined with easy to understand
           description and high quality images, this is a perfect platform to improve your clinical skills on Pediatric .`,
           bottomIcon: <FiDownload style={{ color: `$--primary` }} />,
          bottomLabel: "Download Now",
          bottomButtontype: "success-link",
          bottomButtonLink:" https://pedi.page.link/xEYL"
          
        },
      },
        {
          id:7,
          details:{
            Icon: require('../../assets/images/appIcon/dm_logo.jpg').default,
            //iconImageColor:,
            productTitle: "MEDICOS DENTAL",
            productDetails: `Introducing this one of a kind amazing app for the very first time in the era of competition for BDS(UG)/MDS (entrance aspirants)/ PG Dental entrance and other relate medical students. You can say learning made handy and ridiculously
             simple, few touches here and there you can get Knowledge of related.All the dental Material at your fingers.`,
             bottomIcon: <FiDownload style={{ color: `$--primary` }} />,
          bottomLabel: "Download Now",
            bottomButtontype: "primary-link",
            bottomButtonLink:"https://denti.page.link/nMQh"
            
          },
        },
        {
          id:8,
          details:{
            Icon: require('../../assets/images/appIcon/medicos_mcq.png').default,
            //iconImageColor:,
            productTitle: "MEDICOS MCQ",
            productDetails: `Downloading one app for books, another for slides, yet another for notes, and yet another for additional medical resources is time consuming and takes up a lot of space on your phone.
    
            As a result of extensive research and brainstorming, the Medicos team has developed the Medicos MCQ app.`,
            bottomIcon: <FiDownload style={{ color: `$--primary` }} />,
            bottomLabel: "Download Now",
            bottomButtontype: "primary-link",
            bottomButtonLink:"https://medicosmcq.page.link/App"
          },
        },
        {
          id:9,
          details:{
            Icon: require('../../assets/images/appIcon/surgery_logo.jpg').default,
            //iconImageColor:,
            productTitle: "MEDICOS SURGERY",
            productDetails: `Medicos Surgery offers you a clear structured and systematic approach to history taking and clinical examination of bed side surgery wards.
            As a medical student, its absolutely critical to get well versed
             with a systematic, step wise approach to history taking.This is an essential skill to acquire for any physician.`,
             bottomIcon: <FiDownload style={{ color: `$--primary` }} />,
             bottomLabel: "Download Now",
            bottomButtontype: "primary-link",
            bottomButtonLink:"https://medicossurgery.page.link/app"
          },
        },
        {
          id:10,
          details:{
            Icon: require('../../assets/images/appIcon/mh.png').default,
            //iconImageColor:,
            productTitle: "MEDICOS HISTOLOGY",
            productDetails: `Medicos Histology app provides mobile access to a complete collection 
            of ultra-high-resolution histology microscopic slide images with notes and explanation of those topics in a simple and easy to understand way.`,
            bottomIcon: <FiDownload style={{ color: `$--primary` }} />,
          bottomLabel: "Download Now",
            bottomButtontype: "primary-link",
            bottomButtonLink:"https://histo.page.link/apP"
          },
        },
    ]

    const comment=[
      {
       image:require('../../assets/images/profile3.png').default,
       name:'Manoj_khatri',
       comment:"You’re a solid developer. You’ve built software people use, and it works well for them. Now, you want that next step—to lead a team that builds software. Over nearly 20 years in this industry, I’ve acted as a Tech Lead many times, mentored dozens of developers towards technical leadership roles, and regularly worked with companies to hire and develop technical leaders"
      },
      {
        image:require('../../assets/images/profile3.png').default,
        name:'Manoj_khatri',
        comment:"You’re a solid developer. You’ve built software people use, and it works well for them. Now, you want that next step—to lead a team that builds software. Over nearly 20 years in this industry, I’ve acted as a Tech Lead many times, mentored dozens of developers towards technical leadership roles, and regularly worked with companies to hire and develop technical leaders"
       },
       {
        image:require('../../assets/images/profile3.png').default,
        name:'Manoj_khatri',
        comment:"You’re a solid developer. You’ve built software people use, and it works well for them. Now, you want that next step—to lead a team that builds software. Over nearly 20 years in this industry, I’ve acted as a Tech Lead many times, mentored dozens of developers towards technical leadership roles, and regularly worked with companies to hire and develop technical leaders"
       },
    ]



export {
  comment,
  ProfileNav,
  profile,
  notesLists,
  exploreProfileTab,
  slideRecentLeft,
  slideRecentRight,
  mostVisit,
  journalCategoriesDetails,
  journalSelected,
  homeAwesomeProductDetails,
  latestJournal,
  journalSlider,
  outPost,
  journalRecent,
  slideRecentSlideDetails, slideTrending, weekendscol2, newsDetailNavigationLinksDetails, newsDetailAboutAuthorDetails, newsDetailFutureFocusedDetails, newsDetailMoreFromInHypeDetails, newsDetailAlsoReadDetails, newsDetailRelatedPostsDetails, newsDetailFollowUsDetails, newsDetailCategoriesDetails, newsDetailInHypeSponsoredDetails, newsDetailTrendingDetails, newsIntroductionCardDetails, newsDetailsTopBackground, lastseccol1row1, lastsecCol1, articelpopular, ArticlelatestPost, selected, ArticleCategoriesDetails, income, trending, markets, worldwideDetails, quickTake, europeanNews, politics, weekends, topSlider, InHype, stories, mainTopCol3, mainTopCol2, mainTopCol1, terms, ourTeam, newsLastWholeSectionDetails, newsWhatsTrendingTodayDetails, newsSelectedPostsDetails, newsVideoDetailsLeft, newsVideoDetailsRight, newsMoreFromHypeSliderDetails, newsCategoriesDetails, newsTravelDetails, newsSelectedDetailsLeft, newsSelectedDetailsRight, newsArtAndCultureDetails, newsTodayHighlightsDetails, newsTechnologyDetails, newsRecentDetailsRight, newsRecentDetailsLeft, newsLinksDetails, accordion, sliderSlides, cart, navLinks, topContent, relatedStories, invoices, awesomeProject, awesomeProduct, footerBottomContent, Sub_Catagories, slides, reviews, tabs, pages, appList, comments, dropdownsingle, customizableselectNames, li1, li2, li2h, li3, li3h, li4, li4h, imagebackC1, imagebackC2, imagebackC3, imagebookcover1, radioOptions, exploreLinks, relatedBooksSliderDetails, ExploreMoreSliderDetails, whatClientSays, joinOurWorldDetails, newsCarousalData
};




