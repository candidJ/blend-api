import { NgModule } from '@angular/core';

import { FeatherModule } from 'angular-feather';
import {
  Camera, Heart, Github, Eye, Twitter, Bell, ExternalLink, Linkedin, XCircle, Calendar, BookOpen, Search, Facebook, Instagram, Book, Star, Code, Info, List, Loader, Grid, Clipboard,
  Cloud, CloudLightning, CloudRain, CloudSnow, CloudOff, Delete, MapPin, Globe, FileText, Award, MessageSquare, Watch, User, ThumbsUp, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Cpu, RefreshCcw
} from 'angular-feather/icons';

// Select some icons (use an object, not an array)
const icons = {
  Camera, Heart, Github, Eye, Twitter, Bell, ExternalLink, Linkedin, XCircle, Calendar, BookOpen, Search, Facebook, Instagram, Book, Star, Code, Info, List, Loader, Grid, Clipboard,
  Cloud, CloudLightning, CloudRain, CloudSnow, CloudOff, Delete, MapPin, Globe, FileText, Award, MessageSquare, Watch, User, ThumbsUp, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Cpu, RefreshCcw
};

@NgModule({
  imports: [
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconsModule { }