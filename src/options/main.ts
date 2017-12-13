import Datai18n from './Datai18n';
import Options from './Options';

const datai18n = new Datai18n();
datai18n.render();

const options = new Options();
options.initialize().then(() => {
  options.loadRadioStorage();
  options.loadCheckboxStorage();
});
