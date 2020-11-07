import React, {useEffect, useState} from 'react'
import LinkForm from './LinkForm'
import db from "../firebase";
import { toast } from "react-toastify";

const Links = () => {

    const [listProducts, setListProducts] = useState([])

    const [currentId, setCurrentId] = useState('');

    const addOrEditProduct = async (productObject) => {
        try {
            if (currentId === '') {
                await db.collection('productos').doc().set(productObject);
                toast('Nuevo producto agregado', {
                    type: 'success'
                });
            } else {
                await db.collection('productos').doc(currentId).update(productObject);
                toast('Producto actualizado', {
                    type: 'info'
                });
                setCurrentId('');
            } 
        } catch (error) {
            console.error(error)
        } 
    };

    const onDeleteProduct = async (id) => {
        if(window.confirm('¿Estas seguro de eliminar este producto?')) {
            await db.collection('productos').doc(id).delete();
            toast('Producto eliminado', {
                type: 'error'
            });
            console.log('Producto eliminado');
        };
    };

    const getProducts = async () => {
        db.collection('productos').onSnapshot( (querySnapshot) => {
            const docs = [];
            querySnapshot.forEach( (doc) => {
                docs.push({...doc.data(), id: doc.id});
            });
            setListProducts(docs);
        });
    };

    useEffect( () => {
        getProducts();
    }, []);

    return(
        <div>
            <div className="col-md p-2">
                <LinkForm {...{addOrEditProduct, currentId, listProducts}}/>
            </div>
            <div className="col-md-6">
                { listProducts.map( (product) => (
                    <div className="card mb-1" key={product.id}>
                        <div className="card-body">
                            <div className="d-flex justify-content">
                                <p>{ product.producto }</p>
                                <div>
                                    <i
                                        className="material-icons text-danger"
                                        onClick={ () => onDeleteProduct(product.id)}
                                    >
                                        close
                                    </i>
                                    <i
                                        className="material-icons"
                                        onClick={ () => setCurrentId(product.id) }
                                    >
                                        create
                                    </i>
                                </div>
                            </div>   
                            <p>{ product.precio }</p>
                            <p>{ product.descripcion }</p>
                        </div>
                    </div>
                )) }
            </div>
        </div>
    );
}

export default Links;