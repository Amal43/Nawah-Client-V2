import sucess from '../../Assets/images/sucess.png';
import CheckoutStyle from'./Checkout.module.css';

function SucessPayement() {
    return (
        <div className={CheckoutStyle.successdiv}>
            <img src={sucess} alt="sucess-payment" className={CheckoutStyle.success} />
            <h2>تمت عملية الدفع بنجاح🎉🎊</h2>
        </div>
    )
}

export default SucessPayement;