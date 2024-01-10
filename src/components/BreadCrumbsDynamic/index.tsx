import { Breadcrumb, Space } from 'antd'
import { Link, useLocation } from 'react-router-dom'
type Props = {
  homeUrl?: string
  homeTitle?: string
  homeIcon?: React.ReactNode
  separator?: string
}

const BreadCrumbsDynamic = (props: Props) => {
  const { homeUrl = '/', homeTitle = 'Trang chủ', homeIcon, separator } = props
  const location = useLocation()

  const breadCrumbView = () => {
    const { pathname } = location
    const pathnames = pathname.split('/').filter((item) => item)
    const capatilize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1)

    return (
      <div>
        <Breadcrumb separator={separator}>
          {pathnames.length > 0 ? (
            <Breadcrumb.Item>
              <Link to={homeUrl}>
                <Space>
                  {homeIcon}
                  {homeTitle}
                </Space>
              </Link>
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item>{homeTitle}</Breadcrumb.Item>
          )}
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`
            const isLast = index === pathnames.length - 1

            return isLast ? (
              <Breadcrumb.Item key={index}>{capatilize(name)}</Breadcrumb.Item>
            ) : (
              index >= 0 && (
                <Breadcrumb.Item key={index}>
                  <Link to={`${routeTo}`}>{capatilize(name)}</Link>
                </Breadcrumb.Item>
              )
            )
          })}
        </Breadcrumb>
      </div>
    )
  }

  return <>{breadCrumbView()}</>
}

export default BreadCrumbsDynamic
