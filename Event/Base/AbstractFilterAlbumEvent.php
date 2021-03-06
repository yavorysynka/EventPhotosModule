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
use RK\EventPhotosModule\Entity\AlbumEntity;

/**
 * Event base class for filtering album processing.
 */
class AbstractFilterAlbumEvent extends Event
{
    /**
     * @var AlbumEntity Reference to treated entity instance.
     */
    protected $album;

    /**
     * @var array Entity change set for preUpdate events.
     */
    protected $entityChangeSet = [];

    /**
     * FilterAlbumEvent constructor.
     *
     * @param AlbumEntity $album Processed entity
     * @param array $entityChangeSet Change set for preUpdate events
     */
    public function __construct(AlbumEntity $album, array $entityChangeSet = [])
    {
        $this->album = $album;
        $this->entityChangeSet = $entityChangeSet;
    }

    /**
     * Returns the entity.
     *
     * @return AlbumEntity
     */
    public function getAlbum()
    {
        return $this->album;
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
