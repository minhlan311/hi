import css from './VerticalCategoryMenuBar.module.scss'
import { Link } from 'react-router-dom'

const VerticalCategoryMenuBar = () => {
  const categoriesSubData = [
    {
      key: '1',
      label: '開発',
      href: '/',
      children: [
        { key: '1-1', label: 'ウェブ開発', href: '/' },
        { key: '1-2', label: 'モバイル開発', href: '/' },
        { key: '1-3', label: 'プログラミング言語', href: '/' },
        { key: '1-4', label: 'ゲーム開発', href: '/' },
        { key: '1-5', label: 'DBデザイン - 開発', href: '/' },
        { key: '1-6', label: 'ソフトウェアテスト', href: '/' }
      ]
    },
    {
      key: '2',
      label: 'ビジネススキル',
      href: '/',
      children: [
        { key: '2-1', label: '新規事業開発', href: '/' },
        { key: '2-2', label: 'コミュニケーション', href: '/' },
        { key: '2-3', label: 'チームマネージメント', href: '/' },
        { key: '2-4', label: '営業・販売スキル', href: '/' },
        { key: '2-5', label: 'ビジネス戦略', href: '/' }
      ]
    },
    {
      key: '3',
      label: '財務会計',
      href: '/',
      children: [
        { key: '3-1', label: '会計&簿記', href: '/' },
        { key: '3-2', label: '暗号通貨をプロックチェーン', href: '/' },
        { key: '3-3', label: 'ファイナンス', href: '/' },
        { key: '3-4', label: '財務モデリング・分析', href: '/' },
        { key: '3-5', label: '投資・株式', href: '/' }
      ]
    },
    {
      key: '4',
      label: 'ITとソフトウェア',
      href: '/',
      children: [
        { key: '4-1', label: 'IT資格', href: '/' },
        { key: '4-2', label: 'ネットワークとセキュリティ', href: '/' },
        { key: '4-3', label: 'ハードウェア', href: '/' },
        { key: '4-4', label: 'OSとサー', href: '/' },
        { key: '4-5', label: 'その他のIT- ソフトウェア', href: '/' }
      ]
    },
    {
      key: '5',
      label: '仕事の生産性',
      href: '/',
      children: [
        { key: '5-1', label: 'Microsoft', href: '/' },
        { key: '5-2', label: 'Apple', href: '/' },
        { key: '5-3', label: 'Google', href: '/' },
        { key: '5-4', label: 'SAP', href: '/' },
        { key: '5-5', label: 'Oracle', href: '/' },
        { key: '5-6', label: 'その他の職場の生産性', href: '/' }
      ]
    },
    {
      key: '6',
      label: '自己啓発',
      href: '/',
      children: [
        { key: '6-1', label: '目標達成', href: '/' },
        { key: '6-2', label: '個人の生産性', href: '/' },
        { key: '6-3', label: 'リーダーシップ', href: '/' },
        { key: '6-4', label: 'キャリア', href: '/' },
        { key: '6-5', label: '子育て&家族', href: '/' }
      ]
    },
    {
      key: '7',
      label: 'デザイン',
      href: '/',
      children: [
        { key: '7-1', label: 'ウェブデザイン', href: '/' },
        { key: '7-2', label: 'グラフィックデザインとイラストレーション', href: '/' },
        { key: '7-3', label: 'デザインツール', href: '/' },
        { key: '7-4', label: 'UX (ユーザー体験) デザイン', href: '/' },
        { key: '7-5', label: 'ゲームデザイン', href: '/' },
        { key: '7-6', label: '3D・アニメーション', href: '/' }
      ]
    },
    {
      key: '8',
      label: 'マーケティング',
      href: '/',
      children: [
        { key: '8-1', label: 'デジタルマーケティング', href: '/' },
        { key: '8-2', label: 'SEO', href: '/' },
        { key: '8-3', label: 'ソーシャルメディアマーケティング', href: '/' },
        { key: '8-4', label: 'プランディング', href: '/' },
        { key: '8-5', label: 'マーケティングの基礎', href: '/' },
        { key: '8-6', label: 'マーケティング分析と自動化', href: '/' }
      ]
    },
    {
      key: '9',
      label: '健康・フィットネス',
      href: '/',
      children: [
        { key: '9-1', label: 'エクササイズ', href: '/' },
        { key: '9-2', label: '健康', href: '/' },
        { key: '9-3', label: 'スポーッツ', href: '/' },
        { key: '9-4', label: '栄養学きダイエット', href: '/' },
        { key: '9-5', label: 'ヨガ', href: '/' },
        { key: '9-6', label: '心のケア', href: '/' }
      ]
    },
    {
      key: '10',
      label: '音楽',
      href: '/',
      children: [
        { key: '10-1', label: '楽器入門', href: '/' },
        { key: '10-2', label: '音楽制作', href: '/' },
        { key: '10-3', label: '音楽の基礎', href: '/' },
        { key: '10-4', label: 'ボイストレーニング', href: '/' },
        { key: '10-5', label: '演奏テクニック', href: '/' },
        { key: '10-6', label: '音楽ソフトの使い方', href: '/' }
      ]
    }
  ]

  return (
    <div className={css.menu}>
      {categoriesSubData.map((item) => (
        <Link to={item.href} key={item.key} className={css.menuLabel}>
          <div className={css.labelItem}>
            {item.label}
            <div className={css.arr}></div>
          </div>
          <div className={css.chilMenu}>
            {item.children.map((chil) => (
              <Link to={chil.href} className={css.chil} key={chil.key}>
                {chil.label}
              </Link>
            ))}
          </div>
        </Link>
      ))}
    </div>
  )
}

export default VerticalCategoryMenuBar
