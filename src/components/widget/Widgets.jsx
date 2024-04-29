import './widget.scss';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import PersonIcon from '@mui/icons-material/Person';
import SchoolIcon from '@mui/icons-material/School';
import SellIcon from '@mui/icons-material/Sell';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';

const Widgets = ({type,color}) => {
  let data;

  // temporary
  const amount = 100
  const percentage = 20

  switch(type){
    case "students":
      data={
        title: "STUDENTS",
        isMoney: false,
        link: "See all students",
        icon:(
          <PersonIcon className='icon'/>
        )
      }
      break;

    case "tutors":
      data={
        title: "TUTORS",
        isMoney: false,
        link: "See all tutors",
        icon:(
          <SchoolIcon className='icon'/>
        )
      }
      break;

    case "sales":
      data={
        title: "SALES",
        isMoney: true,
        link: "View net sales",
        icon:(
          <SellIcon className='icon'/>
        )
      }
      break;

    case "sessions":
      data={
        title: "SESSIONS",
        isMoney: false,
        link: "See all sessions",
        icon:(
          <LibraryAddCheckIcon className='icon'/>
        )
      }
      break;

      default:
      break;
  }


  return (
    <div className='widget' style={{ backgroundColor: color }}>

        <div className='left'>
            <span className='title'>{data.title}</span>
            <span className='counter'>{data.isMoney && "$"} {amount}</span>
            <span className='link'>{data.link}</span>
        </div>
        <div className='right'>
            <div className='percentage positive'>
            <KeyboardArrowUpIcon/>
            {percentage} %
            </div>
            {data.icon}
        </div>
      
    </div>
  )
}

export default Widgets
