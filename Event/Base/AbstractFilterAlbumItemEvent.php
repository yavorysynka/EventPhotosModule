<?php
/**
 * EventPhotos.
 *
 * @copyright Ralf Koester (RK)
 * @license http://www.gnu.org/licenses/lgpl.html GNU Lesser General Public License
 * @author Ralf Koester <ralf@familie-koester.de>.
 * @link http://k62.de
 * @link http://zikula.org
 * @version Generated by ModuleStudio 1.3.0 (https://modulestudio.de).
 */

namespace RK\EventPhotosModule\Event\Base;

use Symfony\Component\EventDispatcher\Event;
use RK\EventPhotosModule\Entity\AlbumItemEntity;

/**
 * Event base class for filtering album item processing.
 */
class AbstractFilterAlbumItemEvent extends Event
{
    /**
     * @var AlbumItemEntity Reference to treated entity instance.
     */
    protected $albumItem;

    /**
     * @var array Entity change set for preUpdate events.
     */
    protected $entityChangeSet = [];

    /**
     * FilterAlbumItemEvent constructor.
     *
     * @param AlbumItemEntity $albumItem Processed entity
     * @param array $entityChangeSet Change set for preUpdate events
     */
    public function __construct(AlbumItemEntity $albumItem, array $entityChangeSet = [])
    {
        $this->albumItem = $albumItem;
        $this->entityChangeSet = $entityChangeSet;
    }

    /**
     * Returns the entity.
     *
     * @return AlbumItemEntity
     */
    public function getAlbumItem()
    {
        return $this->albumItem;
    }

    /**
     * Returns the change set.
     *
     * @return array Entity change set
     */
    public function getEntityChangeSet()
    {
        return $this->entityChangeSet;
    }
}
