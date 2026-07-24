import { Note } from 'BscStudent'

export const Default = () => (
  <div dir="rtl" className="max-w-xl">
    <Note>
      זה אולי נשמע פשוט למי שרגיל להתקין תוכנות על המחשב, אבל מדובר קודם כל על אתרים ושרתים
      שרצים אצלכם בבית, ולא בענן של מישהו אחר.
    </Note>
  </div>
)

export const WithEmphasis = () => (
  <div dir="rtl" className="max-w-xl">
    <Note>
      שימו לב: כדי להתחבר מבחוץ צריך לקנות <strong>דומיין</strong> ולהפנות אותו לכתובת הבית שלכם.
    </Note>
  </div>
)
