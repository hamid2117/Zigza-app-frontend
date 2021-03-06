import UsersIcon from '@material-ui/icons/GroupOutlined'
import DashboardIcon from '@material-ui/icons/DashboardOutlined'
import CollectionsBookmarkIcon from '@material-ui/icons/CollectionsBookmark'
import NotInterestedIcon from '@material-ui/icons/NotInterested'
import SpeakerNotesIcon from '@material-ui/icons/SpeakerNotes'
import { Money } from '@material-ui/icons'
export const Sidebar = [
  // {
  //   id: 9,
  //   link: '/productlist',
  //   heading: 'Product',
  //   Icon: DashboardIcon,
  // },
  // {
  //   id: 1,
  //   link: '/cashlist',
  //   heading: 'CashRegration',
  //   Icon: Money,
  // },
  {
    id: 2,
    link: '/userlist',
    heading: 'Userlist ',
    Icon: UsersIcon,
  },
  // {
  //   id: 3,
  //   link: '/agencylist',
  //   heading: 'Agency',
  //   Icon: CollectionsBookmarkIcon,
  // },
  // {
  //   id: 4,
  //   link: '/cashbooklist',
  //   heading: 'Cashbook',
  //   Icon: SpeakerNotesIcon,
  // },
  // {
  //   id: 5,
  //   link: '/unverified',
  //   heading: 'Unverified',
  //   Icon: NotInterestedIcon,
  // },
]

export const rows = [
  {
    isAdmin: false,
    _id: '1212121',
    name: 'Ahmed Ali ',
    email: 'hamid@gmail.com',
    createdAt: '12-6-2021',
    city: 'Islamabad',
  },
]

export const courseData = [
  {
    _id: '1212121',
    address: 'rawalpindi plaza',
    createdAt: '12-6-2021',
    charges: '2000 rs',
    contact: '03121302839',
    instructor: '6128b7ddd60a70069c898138',
    coursetitle: 'Best Course ever build',
    coursedescription: 'Best Course ever build',
    instructordescription: 'Best Instructor ever build',
    endtime: '18:00',
    starttime: '15:00',
    gymname: 'bahadur gym',
    lecturelink: 'https://meet.google.com/',
    location: 'alsdkfjaslkd;fj;aslkdfj',
    maxstudents: '80',
  },
]
export const incidentData = [
  {
    _id: '1212121',
    location: {
      type: 'Point',
      coordinates: [0, 0],
    },
    status: 'verified',
    createdAt: '12-6-2021',
    files: [
      {
        type: 'image',
        path: '93cb7734-cf7f-43cd-b387-e3d1cdcd1aa0.jpeg',
      },
    ],
    type: 'Crime',
    title: 'testing',
    description: 'Testing this incident.',
  },
]

export const cashData = [
  {
    _id: '1212121',
    codee: 223,
    label: 'apple12314', //alphanumeric characters orange12314
    status: false,
    currency: 'EUR',
    state: false,
    createdAt: '12-6-2021',
    updatedAt: '12-6-2021',
  },
]
export const agencyData = [
  {
    _id: '1212121',
    codee: 223,
    label: 'apple12314', //alphanumeric characters orange12314
    createdAt: '12-6-2021',
    updatedAt: '12-6-2021',
  },
]
export const cashBookData = [
  {
    _id: '1212121',
    type: 'client',
    account: '234d',
    balance: '2000000',
    createdAt: '12-6-2021',
    updatedAt: '12-6-2021',
  },
]
export const productData = [
  {
    _id: '1212121',
    codee: 223,
    label: 'apple12314',
    durationEnum: 'Month',
    statusEnum: 'false',
    association: 'false',
    createdAt: '12-6-2021',
  },
]
