import { StyleSheet } from 'react-native';

const marginLeftText = '5%';
const marginBottomText = 10;

const styles = StyleSheet.create({
  container: {
    width: '85%',
    marginLeft: '7.5%'
  },
  title: {
    fontSize: 33,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 40,
    marginBottom: 10
  },
  textInput: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#E2E1E1',
    borderRadius: 40,
    marginBottom: 10,
  },
  textInputCollapse: {
    width: '90%',
    marginLeft: 20,
  },
  inputTitle: {
    marginLeft: marginLeftText,
    marginBottom: marginBottomText,
    marginTop: 10,
    fontSize: 16,
    fontWeight: '900'
  },
  inputError: {
    borderColor: 'red',
    borderWidth: 1,
    marginBottom: 4
  },
  description: {
    height: 200,
    paddingHorizontal: 30,
    paddingVertical: 25
  },
  buttonContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20
  },
  addButton: {
    flexDirection: 'row',
    height: 50,
    marginTop: 20,
    marginBottom: 10,
    width: '50%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#362893',
    borderRadius: 20,
    padding: 10,
  },
  error: {
    marginLeft: marginLeftText,
    color: 'red',
    fontSize: 15,
    marginBottom: 10
  },
  collapse: {
    flexDirection: 'row',
  },

  collapseHeader: {
    flexDirection: 'row',
    marginHorizontal: 30,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
    borderWidth: 1.8,
    borderColor: 'gray',
    borderStyle: 'solid'
  },
  standardHeader: {
    flexDirection: 'row',
    marginLeft: 10,
    marginRight: 30,
    marginTop: 20,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10
  },
  headerTitle: {
    fontWeight: 'bold',
    fontSize: 18
  },
  marginsText: {
    marginLeft: marginLeftText,
    marginBottom: marginBottomText,
    marginTop: 10,
  },
  label: {
    marginRight: 15,
    marginVertical: 10,
    paddingVertical: 6,
    paddingHorizontal: 15,
    backgroundColor: '#c4c4c4',
    borderRadius: 10,
  },
  alignedLabel: {
    flex: 1,
    width: 100,
    margin: 10,
    marginLeft: 0,
    paddingVertical: 6,
    paddingHorizontal: 10,
    backgroundColor: '#c4c4c4',
    borderRadius: 10,
    justifyContent: 'center'
  },
  selected: {
    backgroundColor: '#fff'
  }
});

export default styles;
