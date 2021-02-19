import { Modal, Button, Row } from "react-bootstrap";
import MovieForm from "./MovieForm";
import { useState, React } from "react";
import { useSelector } from "react-redux";
import { 
    LOAD_MOVIES_CREATE_SUBMITTED
 } from "../../redux/actionTypes";
import { connect } from "react-redux";
import agent from "../../api/moviesApi";
import { Alert } from "react-bootstrap";
function CreateMovie()
{
    //accès store
    const movie = useSelector(state => state);

    //gestion show/hide modal
    const [show,isVisible] = useState(false);
    const toggleOpen = () => isVisible(true);
    const toggleClose = () => isVisible(false);




    //gestion des Dates
    const getFormattedStringDate = (dt) =>{

        let myDt = dt;
        let mydTEdit = myDt.toISOString().split('T')[0] + ' '+ myDt.toTimeString().split(' ')[0]; 
        return mydTEdit;
    };
    
    //submit form
    const handleCreate = (e) => {
        e.preventDefault();
        let movieSubmitted = movie;

        console.log(movieSubmitted);
        try{
            let movieValidated = movieValidation(movieSubmitted);
            if(movieValidated === true)
            {
                movieSubmitted.creationArticleDate = (new Date()).toJSON();
                movieSubmitted.publishDate = (new Date(movieSubmitted.publishDate)).toJSON();
                agent.Movies.create(JSON.stringify(movieSubmitted)).then((res) => {
                    console.log(res);
                });  
            }
            

        }catch(e){
            console.log(e);
            return null;
        }
    }
    const movieValidation = ( movieSubmitted )=>
    {
        let val = false;
        try{
            //validations            
            val = true;
        }
        catch(e){
            //erreurs
            console.log("validation catch : ");
            console.log(e);
            val = false;
        }
        finally{
            return val;
        }
    }

    return(
        <>
        <Button size="lg" onClick={ toggleOpen }>Ajouter un film</Button>
        <Modal size="lg" show={show} onHide={toggleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Ajouter un nouveau film</Modal.Title>
            </Modal.Header>
        
            <Modal.Body>
                <MovieForm />
            </Modal.Body>

            <Modal.Footer>
                <Row className="col-12 justify-content-around p-4">
                    <Button onClick={toggleClose} className="btn-warning col-3">Annuler</Button>
                    <Button onClick={handleCreate} className="btn-success col-3">Créer</Button>
                </Row>
                <Alert>
                    <Alert.Link></Alert.Link>
                </Alert>
            </Modal.Footer>
        
            
        </Modal>
        </>
    );
}
const mapStateToProps = state => ({
    movie: state
  });

  const mapDispatchToProps = dispatch => ({
    handleCreate: payload =>
    {
        return dispatch({ type: LOAD_MOVIES_CREATE_SUBMITTED, payload });
    }        
  });
export default connect(mapStateToProps,mapDispatchToProps)(CreateMovie)