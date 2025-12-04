
import ClickSpark from './components/ClickSpark'
import { AppRoutes } from './routes/AppRoutes'
const App = () => {
  return (
    <>
      <ClickSpark
        sparkColor='#000'
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <AppRoutes />
      </ClickSpark>
    </>
  )
}

export default App