import React from 'react';
import ReactDom from 'react-dom';
import {AppContainer} from 'react-hot-loader';
import {Provider} from 'react-redux';
import store from './redux/store';
import {BrowserRouter as Router} from 'react-router-dom';
import App from 'components/App/App';
import * as Constant from './util/Constant';
renderWithHotReload(App);

if (module.hot) {
		module.hot.accept('components/App/App', () => {
				const NextApp = require('components/App/App').default;
				renderWithHotReload(NextApp);
		});
}

function renderWithHotReload(RootElement) {
		Constant.requestParams = GetRequest();
		console.log(Constant.requestParams);
		ReactDom.render(
				<AppContainer>
						<Provider store={store}>
								<Router>
										<RootElement/>
								</Router>
						</Provider>
				</AppContainer>,
				document.getElementById('app')
		)
}

function GetRequest() {
		console.log(location);
   var url = location.search; //获取url中"?"符后的字串
   var theRequest = new Object();
   if (url.indexOf("?") != -1) {
      var str = url.substr(1);
      var strs = str.split("&");
      for(var i = 0; i < strs.length; i ++) {
         theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
      }
   }
   return theRequest;
}
