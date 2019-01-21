import React, { Component } from 'react'
import { Helmet } from 'react-helmet'
import withStyles from "@material-ui/core/styles/withStyles";
import dashboardStyle from "assets/jss/material-dashboard-react/layouts/dashboardStyle.jsx";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ArrowBack from '@material-ui/icons/ArrowBack';
import { NavLink } from 'react-router-dom'
import { withRouter } from "react-router-dom";

class AppPage extends Component {
  constructor(props) {
    super(props);
  }

  // head(){
  //   return (
  //     <Helmet>
  //       <title>{`Account`}</title>
  //       <meta property="og:title" content="Account"/>
  //     </Helmet>
  //   )
  // }
  render(){
    const { classes, title, route, ...rest } = this.props;
    return (
      <div className={`slide${route.zIndex}`}>
        <div className={classes.content}>
          {this.props.route.title}
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fringilla fringilla magna, non eleifend augue lobortis in. Donec faucibus, purus quis ornare bibendum, diam libero elementum dolor, sed aliquet purus diam vitae leo. Mauris eget congue justo. Donec vel massa nec mauris ultrices ullamcorper. Praesent id turpis vel nibh maximus consequat. Aliquam eget sem leo. Duis eleifend justo in sem dapibus, in blandit mauris porta. Pellentesque at tortor velit. Vestibulum eu efficitur eros. Suspendisse tincidunt elit ut consectetur posuere. Aenean eget dapibus tortor. Morbi quam quam, lacinia nec dictum vitae, luctus ut justo. Quisque dapibus nisl et tortor tristique imperdiet. Proin ornare tortor lorem, non convallis erat malesuada a.

          Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam quis ligula mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur lorem nisl, iaculis sit amet ultrices eu, accumsan vitae dolor. Nunc non ligula et eros tincidunt dapibus. Donec vulputate efficitur ante non sagittis. Ut non rutrum felis. Morbi scelerisque rhoncus erat, eu consectetur est malesuada facilisis. Vestibulum ac dui elit. Sed at tellus tincidunt, sollicitudin felis ut, fringilla enim. Duis interdum neque libero. Sed blandit, tortor in cursus mattis, dolor felis tempor nisi, in posuere mi nunc in sapien. Ut in arcu eget ante lacinia semper. Nulla aliquet nunc vel urna commodo, non ultricies mi rhoncus. Sed euismod ac enim eu ullamcorper. Sed id mauris ex.

          Cras quis porta ligula. Quisque vel maximus nibh, at varius dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla blandit gravida erat, eget ullamcorper urna tincidunt ut. Vestibulum aliquam sit amet mi nec aliquet. Morbi vel elementum tellus. Donec sed rhoncus justo, vel condimentum nisl. Fusce eu dignissim libero, non auctor sapien.

          Ut vitae nunc sed massa aliquet porttitor a vitae erat. Nulla lacus risus, tempus at tristique at, mollis et nisi. Cras tincidunt efficitur ipsum sit amet laoreet. Nam nec tincidunt mi. Nullam quis dolor ut ante tempor venenatis nec non neque. Vivamus sit amet orci est. Sed nec magna id nisl porta rutrum. Duis faucibus tempor erat, a pretium est. Aenean nec molestie lorem. Donec sodales ipsum eu urna suscipit, dictum posuere dolor facilisis. Nam viverra pretium nunc, eget accumsan neque gravida ut. Mauris nec commodo metus. Fusce et efficitur eros. Proin ultricies dolor faucibus finibus eleifend. Donec eget tincidunt erat. Vivamus quis leo efficitur, porttitor purus eget, facilisis neque.

          Sed euismod orci a euismod fringilla. Aenean eu ante vitae justo elementum efficitur nec sed ante. Duis semper, nibh quis consectetur sagittis, nulla sem dignissim purus, eu rhoncus augue dolor eu enim. Cras purus elit, posuere in orci sed, placerat faucibus libero. Nam id cursus tellus. Quisque ultrices aliquam massa, vel tincidunt mauris venenatis id. Integer at ornare eros. Etiam eu elit ut nulla egestas tempus.
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fringilla fringilla magna, non eleifend augue lobortis in. Donec faucibus, purus quis ornare bibendum, diam libero elementum dolor, sed aliquet purus diam vitae leo. Mauris eget congue justo. Donec vel massa nec mauris ultrices ullamcorper. Praesent id turpis vel nibh maximus consequat. Aliquam eget sem leo. Duis eleifend justo in sem dapibus, in blandit mauris porta. Pellentesque at tortor velit. Vestibulum eu efficitur eros. Suspendisse tincidunt elit ut consectetur posuere. Aenean eget dapibus tortor. Morbi quam quam, lacinia nec dictum vitae, luctus ut justo. Quisque dapibus nisl et tortor tristique imperdiet. Proin ornare tortor lorem, non convallis erat malesuada a.

          Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam quis ligula mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur lorem nisl, iaculis sit amet ultrices eu, accumsan vitae dolor. Nunc non ligula et eros tincidunt dapibus. Donec vulputate efficitur ante non sagittis. Ut non rutrum felis. Morbi scelerisque rhoncus erat, eu consectetur est malesuada facilisis. Vestibulum ac dui elit. Sed at tellus tincidunt, sollicitudin felis ut, fringilla enim. Duis interdum neque libero. Sed blandit, tortor in cursus mattis, dolor felis tempor nisi, in posuere mi nunc in sapien. Ut in arcu eget ante lacinia semper. Nulla aliquet nunc vel urna commodo, non ultricies mi rhoncus. Sed euismod ac enim eu ullamcorper. Sed id mauris ex.

          Cras quis porta ligula. Quisque vel maximus nibh, at varius dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla blandit gravida erat, eget ullamcorper urna tincidunt ut. Vestibulum aliquam sit amet mi nec aliquet. Morbi vel elementum tellus. Donec sed rhoncus justo, vel condimentum nisl. Fusce eu dignissim libero, non auctor sapien.

          Ut vitae nunc sed massa aliquet porttitor a vitae erat. Nulla lacus risus, tempus at tristique at, mollis et nisi. Cras tincidunt efficitur ipsum sit amet laoreet. Nam nec tincidunt mi. Nullam quis dolor ut ante tempor venenatis nec non neque. Vivamus sit amet orci est. Sed nec magna id nisl porta rutrum. Duis faucibus tempor erat, a pretium est. Aenean nec molestie lorem. Donec sodales ipsum eu urna suscipit, dictum posuere dolor facilisis. Nam viverra pretium nunc, eget accumsan neque gravida ut. Mauris nec commodo metus. Fusce et efficitur eros. Proin ultricies dolor faucibus finibus eleifend. Donec eget tincidunt erat. Vivamus quis leo efficitur, porttitor purus eget, facilisis neque.

          Sed euismod orci a euismod fringilla. Aenean eu ante vitae justo elementum efficitur nec sed ante. Duis semper, nibh quis consectetur sagittis, nulla sem dignissim purus, eu rhoncus augue dolor eu enim. Cras purus elit, posuere in orci sed, placerat faucibus libero. Nam id cursus tellus. Quisque ultrices aliquam massa, vel tincidunt mauris venenatis id. Integer at ornare eros. Etiam eu elit ut nulla egestas tempus.

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fringilla fringilla magna, non eleifend augue lobortis in. Donec faucibus, purus quis ornare bibendum, diam libero elementum dolor, sed aliquet purus diam vitae leo. Mauris eget congue justo. Donec vel massa nec mauris ultrices ullamcorper. Praesent id turpis vel nibh maximus consequat. Aliquam eget sem leo. Duis eleifend justo in sem dapibus, in blandit mauris porta. Pellentesque at tortor velit. Vestibulum eu efficitur eros. Suspendisse tincidunt elit ut consectetur posuere. Aenean eget dapibus tortor. Morbi quam quam, lacinia nec dictum vitae, luctus ut justo. Quisque dapibus nisl et tortor tristique imperdiet. Proin ornare tortor lorem, non convallis erat malesuada a.

          Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam quis ligula mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur lorem nisl, iaculis sit amet ultrices eu, accumsan vitae dolor. Nunc non ligula et eros tincidunt dapibus. Donec vulputate efficitur ante non sagittis. Ut non rutrum felis. Morbi scelerisque rhoncus erat, eu consectetur est malesuada facilisis. Vestibulum ac dui elit. Sed at tellus tincidunt, sollicitudin felis ut, fringilla enim. Duis interdum neque libero. Sed blandit, tortor in cursus mattis, dolor felis tempor nisi, in posuere mi nunc in sapien. Ut in arcu eget ante lacinia semper. Nulla aliquet nunc vel urna commodo, non ultricies mi rhoncus. Sed euismod ac enim eu ullamcorper. Sed id mauris ex.

          Cras quis porta ligula. Quisque vel maximus nibh, at varius dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla blandit gravida erat, eget ullamcorper urna tincidunt ut. Vestibulum aliquam sit amet mi nec aliquet. Morbi vel elementum tellus. Donec sed rhoncus justo, vel condimentum nisl. Fusce eu dignissim libero, non auctor sapien.

          Ut vitae nunc sed massa aliquet porttitor a vitae erat. Nulla lacus risus, tempus at tristique at, mollis et nisi. Cras tincidunt efficitur ipsum sit amet laoreet. Nam nec tincidunt mi. Nullam quis dolor ut ante tempor venenatis nec non neque. Vivamus sit amet orci est. Sed nec magna id nisl porta rutrum. Duis faucibus tempor erat, a pretium est. Aenean nec molestie lorem. Donec sodales ipsum eu urna suscipit, dictum posuere dolor facilisis. Nam viverra pretium nunc, eget accumsan neque gravida ut. Mauris nec commodo metus. Fusce et efficitur eros. Proin ultricies dolor faucibus finibus eleifend. Donec eget tincidunt erat. Vivamus quis leo efficitur, porttitor purus eget, facilisis neque.

          Sed euismod orci a euismod fringilla. Aenean eu ante vitae justo elementum efficitur nec sed ante. Duis semper, nibh quis consectetur sagittis, nulla sem dignissim purus, eu rhoncus augue dolor eu enim. Cras purus elit, posuere in orci sed, placerat faucibus libero. Nam id cursus tellus. Quisque ultrices aliquam massa, vel tincidunt mauris venenatis id. Integer at ornare eros. Etiam eu elit ut nulla egestas tempus.

          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent fringilla fringilla magna, non eleifend augue lobortis in. Donec faucibus, purus quis ornare bibendum, diam libero elementum dolor, sed aliquet purus diam vitae leo. Mauris eget congue justo. Donec vel massa nec mauris ultrices ullamcorper. Praesent id turpis vel nibh maximus consequat. Aliquam eget sem leo. Duis eleifend justo in sem dapibus, in blandit mauris porta. Pellentesque at tortor velit. Vestibulum eu efficitur eros. Suspendisse tincidunt elit ut consectetur posuere. Aenean eget dapibus tortor. Morbi quam quam, lacinia nec dictum vitae, luctus ut justo. Quisque dapibus nisl et tortor tristique imperdiet. Proin ornare tortor lorem, non convallis erat malesuada a.

          Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Aliquam quis ligula mi. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur lorem nisl, iaculis sit amet ultrices eu, accumsan vitae dolor. Nunc non ligula et eros tincidunt dapibus. Donec vulputate efficitur ante non sagittis. Ut non rutrum felis. Morbi scelerisque rhoncus erat, eu consectetur est malesuada facilisis. Vestibulum ac dui elit. Sed at tellus tincidunt, sollicitudin felis ut, fringilla enim. Duis interdum neque libero. Sed blandit, tortor in cursus mattis, dolor felis tempor nisi, in posuere mi nunc in sapien. Ut in arcu eget ante lacinia semper. Nulla aliquet nunc vel urna commodo, non ultricies mi rhoncus. Sed euismod ac enim eu ullamcorper. Sed id mauris ex.

          Cras quis porta ligula. Quisque vel maximus nibh, at varius dolor. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nulla blandit gravida erat, eget ullamcorper urna tincidunt ut. Vestibulum aliquam sit amet mi nec aliquet. Morbi vel elementum tellus. Donec sed rhoncus justo, vel condimentum nisl. Fusce eu dignissim libero, non auctor sapien.

          Ut vitae nunc sed massa aliquet porttitor a vitae erat. Nulla lacus risus, tempus at tristique at, mollis et nisi. Cras tincidunt efficitur ipsum sit amet laoreet. Nam nec tincidunt mi. Nullam quis dolor ut ante tempor venenatis nec non neque. Vivamus sit amet orci est. Sed nec magna id nisl porta rutrum. Duis faucibus tempor erat, a pretium est. Aenean nec molestie lorem. Donec sodales ipsum eu urna suscipit, dictum posuere dolor facilisis. Nam viverra pretium nunc, eget accumsan neque gravida ut. Mauris nec commodo metus. Fusce et efficitur eros. Proin ultricies dolor faucibus finibus eleifend. Donec eget tincidunt erat. Vivamus quis leo efficitur, porttitor purus eget, facilisis neque.

          Sed euismod orci a euismod fringilla. Aenean eu ante vitae justo elementum efficitur nec sed ante. Duis semper, nibh quis consectetur sagittis, nulla sem dignissim purus, eu rhoncus augue dolor eu enim. Cras purus elit, posuere in orci sed, placerat faucibus libero. Nam id cursus tellus. Quisque ultrices aliquam massa, vel tincidunt mauris venenatis id. Integer at ornare eros. Etiam eu elit ut nulla egestas tempus.
        </div>
      </div>
    )
  }
}

export default {
  component: withStyles(dashboardStyle)(AppPage)
}
