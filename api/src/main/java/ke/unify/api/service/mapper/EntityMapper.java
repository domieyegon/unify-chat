package ke.unify.api.service.mapper;


import org.mapstruct.BeanMapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.mapstruct.NullValuePropertyMappingStrategy;

import java.util.List;

public interface EntityMapper<D, E> {
    E toEntity(D dto);
    D toDto(E entity);
    List<E> toEntity(List<D> dto);
    List<D> toDto(List<E> entity);

    @Named("partialUpdate")
    @BeanMapping(nullValuePropertyMappingStrategy = NullValuePropertyMappingStrategy.IGNORE)
    void partialUpdate(@MappingTarget E entity, D dto);
}
