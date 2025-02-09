import { Card } from 'cx-portal-shared-components'
import uniqueId from 'lodash/uniqueId'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { removeItem } from 'features/apps/favorites/actions'
import { useDispatch } from 'react-redux'

interface FavoriteItemProps {
  item: any
  expandOnHover: boolean
  cardClick: boolean
}

export default function FavoriteItem({
  item,
  expandOnHover,
  cardClick,
}: FavoriteItemProps) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [addedToFavorite, setAddedToFavorite] = useState(false)

  const handleSecondaryButtonClick = (id: string) => {
    dispatch(removeItem(id))
    setAddedToFavorite(!addedToFavorite)
  }

  const handleButtonClick = (id: string) => {
    navigate(`/appdetail/${id}`)
  }

  return (
    <Card
      key={uniqueId(item.title)}
      title={item.title}
      subtitle={item.subtitle}
      image={item.image}
      buttonText="Details"
      imageSize="small"
      imageShape="round"
      variant="compact"
      expandOnHover={expandOnHover}
      filledBackground={true}
      backgroundColor="background.background11"
      rating={item.rating}
      price={item.price}
      onButtonClick={() => handleButtonClick(item.id!)}
      onSecondaryButtonClick={() => handleSecondaryButtonClick(item.id!)}
      addButtonClicked={true}
      onClick={cardClick ? () => handleButtonClick(item.id!) : () => null}
    />
  )
}
