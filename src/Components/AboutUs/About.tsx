import about from './About.module.css';
import user from '../../Assets/images/user.jfif';

const teamMembers = [
  { name: "أمـل مـوسـي", image: user },
  { name: "عبدالرحمن علي", image: user },
  { name: "الاء أكرم", image: user },
  { name: "مـحمد بـدوي", image: user },
  { name: "اسـراء صـلاح", image: user },
  { name: "مـريـم مصـطفـي", image: user },
];

function About() {
  return (
    <section className={`${about.ecommerce_about_team} ${"bg-opacity-50"}`}>
      <div className={"container"}>
        <div className={about.about_us}>
          <div className={"row justify-content-center"}>
            <div className={"col-lg-6"}>
              <div className={"text-center mb-5"}>
                <h2 className={`${"mb-3"} ${about.team}`}>فريق إدارة المشروع</h2>
                <p className={"text-muted fs-15"}>
                  خبرة القائد أولًا وقبل كل شيء، حيث يتمتع بخبرة عميقة في المجال الذي
                  يقوده
                </p>
              </div>
            </div>
          </div>
          <div className={"row justify-content-around"}>
            {teamMembers.map((member, index) => (
              <div key={index} className={"col-xl-2 col-md-6 col-sm-12"}>
                <div className={`${[about.team_box]} ${about["text-center"]}`}>
                  <div className={about["team-img"]}>
                    <img
                      src={member.image}
                      alt="member_image"
                      className={"img-fluid rounded rounded-circle border border-dashed border-dark border-opacity-25"}
                    />
                  </div>
                  <div className={"mt-4 pt-1"}>
                    <h5 className={`${about.team} ${"text-center"}`}>{member.name}</h5>
                    <p className={"text-muted text-center"}>Our Founder</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About;