import { ElementType } from "react";

import { WelcomeSlideType } from "./types";
import WelcomeImage1 from "../../assets/svg/WelcomeSlides/welcome1.svg";
import WelcomeImage2 from "../../assets/svg/WelcomeSlides/welcome2.svg";
import WelcomeImage3 from "../../assets/svg/WelcomeSlides/welcome3.svg";
import { HomeStackScreens, HomeTabsScreens } from "../navigation/screens";

// Tab bar icons
import HomeIcon from "../../assets/svg/TabBarIcons/homeIcon.svg";
import CalendarIcon from "../../assets/svg/TabBarIcons/calendarIcon.svg";
import ProfileIcon from "../../assets/svg/TabBarIcons/profileIcon.svg";

// Profile screen icons
import ProfileIconBlue from "../../assets/svg/Profile/profile.svg";
import StatisticsIcon from "../../assets/svg/Profile/statistics.svg";
import LocationIcon from "../../assets/svg/Profile/location.svg";
import SettingsIcon from "../../assets/svg/Profile/settings.svg";
import LogoutIcon from "../../assets/svg/Profile/logout.svg";

// Settings screen icons
import SettingsNotificationIcon from "../../assets/svg/Settings/notificationsIcon.svg";
import SecurityIcon from "../../assets/svg/Settings/securityIcon.svg";
import HelpIcon from "../../assets/svg/Settings/helpIcon.svg";
import UpdateIcon from "../../assets/svg/Settings/updateIcon.svg";
import AboutIcon from "../../assets/svg/Settings/aboutIcon.svg";
import InviteIcon from "../../assets/svg/Settings/peopleIcon.svg";

export const welcomeScreenSlides: WelcomeSlideType[] = [
  {
    image: WelcomeImage1,
    title: "Easy Time Management",
    text: "With management based on priority and daily tasks, it will give you convenience in managing and determining the tasks that must be done first "
  },
  {
    image: WelcomeImage2,
    title: "Increase Work Effectiveness",
    text: "Time management and the determination of more important tasks will give your job statistics better and always improve"
  },
  {
    image: WelcomeImage3,
    title: "Reminder Notification",
    text: "The advantage of this application is that it also provides reminders for you so you don't forget to keep doing your assignments well and according to the time you have set"
  }
];

export type StoreTab = {
  path: HomeTabsScreens,
  icon: ElementType
}

export const tabBars: StoreTab[] = [
  {
    path: HomeTabsScreens.Dashboard,
    icon: HomeIcon
  },
  {
    path: HomeTabsScreens.TasksCalendar,
    icon: CalendarIcon
  },
  {
    path: HomeTabsScreens.Profile,
    icon: ProfileIcon
  }
];

export type ActionButton<Path> = {
  icon: ElementType,
  label: string,
  path: Path | null
}

export const profileActionButtons: ActionButton<HomeStackScreens>[] = [
  {
    icon: ProfileIconBlue,
    label: "My Profile",
    path: HomeStackScreens.ProfileEdit
  },
  {
    icon: StatisticsIcon,
    label: "Statistic",
    path: HomeStackScreens.Statistics
  },
  {
    icon: LocationIcon,
    label: "Location",
    path: HomeStackScreens.Location
  },
  {
    icon: SettingsIcon,
    label: "Settings",
    path: HomeStackScreens.Settings
  },
  {
    icon: LogoutIcon,
    label: "Logout",
    path: null
  }
];

export const settingsActionButtons: ActionButton<HomeStackScreens>[] = [
  {
    icon: SettingsNotificationIcon,
    label: "Notifications",
    path: HomeStackScreens.NotificationsSettings
  },
  {
    icon: SecurityIcon,
    label: "Security",
    path: HomeStackScreens.Security
  },
  {
    icon: HelpIcon,
    label: "Help",
    path: HomeStackScreens.ProfileEdit
  },
  {
    icon: UpdateIcon,
    label: "Update System",
    path: HomeStackScreens.ProfileEdit
  },
  {
    icon: AboutIcon,
    label: "About",
    path: HomeStackScreens.ProfileEdit
  },
  {
    icon: InviteIcon,
    label: "Invite a friend",
    path: HomeStackScreens.ProfileEdit
  }
];
